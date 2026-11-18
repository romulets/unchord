import { ACCIDENTALS, FLAT_ACC, getPitchClass, LETTER_PITCH_CLASSES, NOTE_LETTERS, SHARP_ACC, wrapPitchClass } from "./notes";

const CHORD_VALIDATION_ERROR = "Invalid chord (only supported chords are major and minor)";

const MINOR_QUALITY_SYMBOLS = ["m", "min", "-"];

type IntervalFamily = "major" | "perfect";
const DEGREE_INTERVAL_FAMILY: Record<number, { semitones: number, qualityClass: IntervalFamily }> = {
  1: { semitones: 0, qualityClass: "perfect" },
  2: { semitones: 2, qualityClass: "major" },
  3: { semitones: 4, qualityClass: "major" },
  4: { semitones: 5, qualityClass: "perfect" },
  5: { semitones: 7, qualityClass: "perfect" },
  6: { semitones: 9, qualityClass: "major" },
  7: { semitones: 11, qualityClass: "major" },
}

type IntervalQuality = "perfect" | "major" | "minor" | "diminished" | "augmented";
const FAMILY_QUALITY: Record<IntervalFamily, Record<number, IntervalQuality>> = {
  perfect: {
    [-1]: "diminished",
    [0]: "perfect",
    [1]: "augmented"
  },
  major: {
    [-2]: "diminished",
    [-1]: "minor",
    [0]: "major",
    [1]: "augmented"
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
interface ScaleDegree {
  degree: number,
  spelledNote: string,
  pitchClass: number,
  intervalFromRoot: Interval,
  role: string
}

export default class Chord {
  readonly chordSymbol: string;
  readonly quality: ChordQuality;
  readonly scale: ScaleDegree[];
  readonly toneDegrees: number[];

  constructor(chord: string) {
    this.chordSymbol = chord;
    this.quality = this.validateAndFindQuality();
    this.toneDegrees = this.buildToneDegrees();
    this.scale = this.buildScale(SCALES_BY_CHORD_QUALITY[this.quality])
  }

  private validateAndFindQuality() {
    const chord = this.chordSymbol;
    if (chord.length === 0) {
      throw new Error(CHORD_VALIDATION_ERROR);
    }

    for (let i = 0; i < chord.length; i++) {
      const part = chord[i];

      if (i === 0) {
        if (!NOTE_LETTERS.includes(part)) {
          throw new Error(CHORD_VALIDATION_ERROR);
        }
        continue;
      }

      if (i === 1) {
        if (!ACCIDENTALS.includes(part)) {
          // No accidental but minor
          if (MINOR_QUALITY_SYMBOLS.includes(chord.substring(i))) {
            return "minor";
          }
          throw new Error(CHORD_VALIDATION_ERROR);
        }
        continue;
      }

      // Any minor left
      if (MINOR_QUALITY_SYMBOLS.includes(chord.substring(i))) {
        return "minor";
      } else {
        throw new Error(CHORD_VALIDATION_ERROR);
      }
    }

    return "major";
  }

  private buildScale(intervalSizes: number[]) {
    // chordSymbol: E
    // rootPitchClass: 4
    // rootLetterIndex: 2
    const { pitchClass: rootPitchClass, letterIndex: rootLetterIndex } = getPitchClass(this.chordSymbol);
    const scale: ScaleDegree[] = [];

    // i: 2
    for (let i = 0; i < NOTE_LETTERS.length; i++) {      
      // targetLetterPos: 4
      const targetLetterPos = (rootLetterIndex + i) % NOTE_LETTERS.length;
      // targetLetter: G
      const targetLetter = NOTE_LETTERS[targetLetterPos];
      // targetLetterPitchClass: 7
      const targetLetterPitchClass = LETTER_PITCH_CLASSES[targetLetterPos];
      // semitoneDistanceToRoot: 4
      const semitoneDistanceToRoot = intervalSizes[i];

      // degree: 3
      const degree = i + 1;
      // pitchClass: 8
      const pitchClass = wrapPitchClass(rootPitchClass + semitoneDistanceToRoot);
      // spelledNote: G#
      const spelledNote = this.getSpelledNote(pitchClass, targetLetterPitchClass, targetLetter);
      // intervalFromRoot: major 3rd
      const intervalFromRoot = this.getIntervalFromRoot(degree, semitoneDistanceToRoot);
      // role: third
      const role = convertToRole(degree);

      scale.push({
        degree,
        pitchClass,
        spelledNote,
        intervalFromRoot,
        role
      });
    }

    return scale;
  }

  private getIntervalFromRoot(degree: number, semitonesDifference: number): Interval {
    const { semitones: semitonesReference, qualityClass } = DEGREE_INTERVAL_FAMILY[degree];
    const difference = semitonesDifference - semitonesReference;
    const quality = FAMILY_QUALITY[qualityClass][difference];

    if (quality === undefined) {
      throw new Error(`Invalid quality for semitones difference: ${degree}, ${semitonesDifference} semitones`);
    }

    return {number: degree, quality};
  }

  private getSpelledNote(pitchClass: number, targetLetterPitchClass: number, targetLetter: string) {
    let accidental = (pitchClass - targetLetterPitchClass) % 12;
    if (accidental > 6) {
      accidental -= 12;
    } else if (accidental < -6) {
      accidental += 12;
    }

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

  public getTones(): ScaleDegree[] {
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