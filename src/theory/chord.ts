import { interpretChord } from "./interpret_chord";
import { FLAT_ACC, getPitchClass, LETTER_PITCH_CLASSES, NOTE_LETTERS, SHARP_ACC, wrapPitchClass } from "./notes";

type IntervalFamily = "major" | "perfect";
const DEGREE_INTERVAL_FAMILY: Record<number, { semitones: number, qualityClass: IntervalFamily }> = {
  1: { semitones: 0, qualityClass: "perfect" },
  2: { semitones: 2, qualityClass: "major" },
  3: { semitones: 4, qualityClass: "major" },
  4: { semitones: 5, qualityClass: "perfect" },
  5: { semitones: 7, qualityClass: "perfect" },
  6: { semitones: 9, qualityClass: "major" },
  7: { semitones: 11, qualityClass: "major" },
  8: { semitones: 12, qualityClass: "perfect" },
}

type IntervalQuality = "perfect" | "major" | "minor" | "diminished" | "augmented" | "doubly diminished" | "doubly augmented";
const FAMILY_QUALITY: Record<IntervalFamily, Record<number, IntervalQuality>> = {
  perfect: {
    [-2]: "doubly diminished",
    [-1]: "diminished",
    [0]: "perfect",
    [1]: "augmented",
    [2]: "doubly augmented",
  },
  major: {
    [-3]: "doubly diminished",
    [-2]: "diminished",
    [-1]: "minor",
    [0]: "major",
    [1]: "augmented",
    [2]: "doubly augmented",
  }
}

type Scales = "major" | "naturalMinor";
const SCALE_INTERVALS: Record<Scales, number[]> = {
  major: [0, 2, 4, 5, 7, 9, 11],
  naturalMinor: [0, 2, 3, 5, 7, 8, 10],
}

type ChordQuality = "major" | "minor";
const SCALES_BY_CHORD_QUALITY: Record<ChordQuality, number[]> = {
  major: SCALE_INTERVALS["major"],
  minor: SCALE_INTERVALS["naturalMinor"],
}

interface Interval {
  number: number,
  quality: IntervalQuality
}

interface RelativeNote {
  spelledNote: string,
  pitchClass: number,
  intervalFromRoot: Interval,
}
interface ScaleRelativeNote extends RelativeNote {
  degree: number,
  role: string,
}

export default class Chord {
  readonly chordSymbol: string;
  readonly rootNote: ScaleRelativeNote;
  readonly bassNote: RelativeNote;

  readonly quality: ChordQuality;
  readonly scale: ScaleRelativeNote[];
  readonly toneDegrees: number[];

  constructor(chord: string) {
    this.chordSymbol = chord;
    const { quality, bass, root } = this.interpretChord();
    this.quality = quality;
    this.toneDegrees = this.buildToneDegrees();
    this.scale = this.buildScale(SCALES_BY_CHORD_QUALITY[this.quality])
    this.rootNote = this.scale[0];
    this.bassNote = bass == root ? this.scale[0] : this.findRelativeToRoot(this.scale[0], bass);
  }

  private interpretChord() {
    const parts = interpretChord(this.chordSymbol);

    const quality = parts.some(p => p.meaning === "minor_symbol") ? "minor" : "major";

    let root = parts[0].part // letter of the root note
    // iterate over the remaining parts to find accidentals for the bass note
    for (const part of parts.slice(1)) {
      if (part.meaning === "accidental") {
        root += part.part;
      } else {
        break;
      }
    }

    let bass: string;
    if (parts.some(p => p.meaning === "bass_letter")) {
      const bassIndex = parts.findIndex(p => p.meaning === "bass_letter");
      bass = parts[bassIndex].part;
      for (const part of parts.slice(bassIndex + 1)) {
        if (part.meaning === "bass_accidental") {
          bass += part.part;
        } else {
          break;
        }
      }
    } else {
      bass = root;
    }

    return { quality: quality as ChordQuality, bass, root };
  }

  // Very similar to buildScale alg.
  // I haven't refactored because I didn't want to go back and forth with strings
  // or creating other middle step methods. But something to look into
  private findRelativeToRoot(root: ScaleRelativeNote, bass: string): RelativeNote {
    const { pitchClass: rootPitchClass, letterIndex: rootLetterIndex } = getPitchClass(root.spelledNote);
    const { pitchClass: bassPitchClass, letterIndex: bassLetterIndex } = getPitchClass(bass);

    const letterDistance = (bassLetterIndex - rootLetterIndex + NOTE_LETTERS.length) % NOTE_LETTERS.length;
    const semitoneDistance = wrapPitchClass(bassPitchClass - rootPitchClass);

    // We are correcting for octaves. We measure distance going up from the root note,
    // if letter distance is 0 and semitone distance is greater than 6, 
    // it is because we went full circle and the bass is an octave above the root
    const intervalNumber = letterDistance == 0 && semitoneDistance > 6 ? 8 : letterDistance + 1;

    const spelledNote = bass;
    const pitchClass = bassPitchClass;
    const intervalFromRoot =this.getIntervalFromRoot(intervalNumber, semitoneDistance)

    return {
      pitchClass,
      spelledNote,
      intervalFromRoot,
    };
  }

  private buildScale(intervalSizes: number[]) {
    const { pitchClass: rootPitchClass, letterIndex: rootLetterIndex } = getPitchClass(this.chordSymbol);
    const scale: ScaleRelativeNote[] = [];

    for (let i = 0; i < NOTE_LETTERS.length; i++) {
      const degree = i + 1;
      const role = convertToRole(degree);
      
      const targetLetterPos = (rootLetterIndex + i) % NOTE_LETTERS.length;
      const targetLetter = NOTE_LETTERS[targetLetterPos];
      const targetLetterPitchClass = LETTER_PITCH_CLASSES[targetLetterPos];
      const semitoneDistanceToRoot = intervalSizes[i];
      
      const pitchClass = wrapPitchClass(rootPitchClass + semitoneDistanceToRoot);
      const spelledNote = this.getSpelledNote(pitchClass, targetLetterPitchClass, targetLetter);
      const intervalFromRoot = this.getIntervalFromRoot(degree, semitoneDistanceToRoot);
      const relativeNote: RelativeNote = {
          pitchClass,
          spelledNote,
          intervalFromRoot,
      }

      scale.push({
        degree,
        role,
        ...relativeNote
      });
    }

    return scale;
  }

  private getIntervalFromRoot(intervalNumber: number, semitonesDifference: number): Interval {
    const { semitones: semitonesReference, qualityClass } = DEGREE_INTERVAL_FAMILY[intervalNumber];
    const difference = normalizeDifference(semitonesDifference - semitonesReference);
    const quality = FAMILY_QUALITY[qualityClass][difference];
    
    if (quality === undefined) {
      throw new Error(`Invalid quality for semitones difference: ${intervalNumber}, ${difference} semitones`);
    }

    return { number: intervalNumber, quality };
  }

  private getSpelledNote(pitchClass: number, targetLetterPitchClass: number, targetLetter: string) {
    const accidental = normalizeDifference((pitchClass - targetLetterPitchClass) % 12);

    if (accidental === 0) {
      return targetLetter;
    }

    if (accidental > 2 || accidental < -2) {
      throw new Error(`Unsupported accidental: ${accidental}`);
    }

    let spelledNote = targetLetter;
    const accSign = accidental > 0 ? SHARP_ACC : FLAT_ACC;
    for (let j = 0; j < Math.abs(accidental); j++) {
      spelledNote += accSign;
    }
    return spelledNote;
  }

  private buildToneDegrees(): number[] {
    // Always a triad for now
    return [1, 3, 5];
  }

  public getTones(): ScaleRelativeNote[] {
    return this.toneDegrees.map(degree => this.scale.find(sd => sd.degree === degree)!);
  }
}

function convertToRole(n: number) {
  if (n < 1 || n > 12) {
    throw new Error(`We don't support ${n} as ordinal`);
  }
  switch (n) {
    case 1:
      return "root";
    case 2:
      return "second";
    case 3:
      return "third";
    case 4:
      return "fourth";
    case 5:
      return "fifth";
    case 6:
      return "sixth";
    case 7:
      return "seventh";
    case 8:
      return "octave";
    default:
      return `${n}th`;
  }
}

function normalizeDifference(difference: number): number {
   if (difference > 6) {
      return difference - 12;
    } else if (difference < -6) {
      return difference + 12;
    }
    return difference;
}
