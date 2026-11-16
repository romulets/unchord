const FLAT = "b";
const SHARP = "#"
const ACCIDENTALS = [FLAT, SHARP];
const NOTE_LETTERS = ["C", "D", "E", "F", "G", "A", "B"];

const LETTER_PITCH_CLASSES = [0, 2, 4, 5, 7, 9, 11];

const MAJOR_INTERVAL_SIZES = [0, 2, 4, 5, 7, 9, 11];

const MINOR_QUALITY_SYMBOLS = ["m", "min", "-"];

type Quality = "major" | "minor" | "diminished" | "augmented";

export default class Chord {
  readonly chordSymbol: string;
  readonly quality: Quality;
  readonly majorScale: string[];
  readonly notes: Record<number, string>;

  constructor(chord: string) {
    this.chordSymbol = chord;
    this.quality = this.findQuality();
    this.majorScale = this.buildMajorScale();
    this.notes = this.findChordDegrees();
  }

  public getNotePositions() {
    return Object.keys(this.notes).map(Number);
  }

  public findDegreeByPosition(positon: number) {
    return this.notes[positon];
  }

  private findQuality() {
    const chord = this.chordSymbol;
    if (chord.length === 0 || chord.length > 2)  {
      throw new Error("Invalid chord");
    }

    for (let i = 0; i < chord.length; i++) {
        const part = chord[i];

        if (i === 0 && !NOTE_LETTERS.includes(part)) {
          throw new Error("Invalid chord");
        }

        if (i === 1 && !ACCIDENTALS.includes(part)) {
          if (!MINOR_QUALITY_SYMBOLS.includes(chord.substring(i))) {
            throw new Error("Invalid chord");
          } else {
           return "minor";
          }
        }
    }

    return "major";
  }

  private findChordDegrees() {
    // Major Triad
    return {
      0: "Root",
      2: "Third",
      4: "Fifth"
    }
  }

  private accidentalOffset(note: string) {
    if (note[1] === SHARP) {
      return 1;
    } else if (note[1] === FLAT) {
      return -1;
    }
    return 0;
  }

  private buildMajorScale() {
    const rootLetterIndex = NOTE_LETTERS.indexOf(this.chordSymbol[0]);
    const rootPitchClass = LETTER_PITCH_CLASSES[rootLetterIndex] + this.accidentalOffset(this.chordSymbol);
    const scale = [];

    for (let i = 0; i < NOTE_LETTERS.length; i++) {
      const naturalLetterPos = (rootLetterIndex + i) % NOTE_LETTERS.length;
      const naturalLetter = NOTE_LETTERS[naturalLetterPos];
      const naturalPitchClass = LETTER_PITCH_CLASSES[naturalLetterPos];
      const intervalSize = MAJOR_INTERVAL_SIZES[i];
      const targetPitch = rootPitchClass + intervalSize;

      let accidental =  (targetPitch - naturalPitchClass) % 12;
      if (accidental > 6) {
        accidental -= 12;
      } else if (accidental < -6) {
        accidental += 12;
      }

      if (accidental === 0) {
        scale.push(naturalLetter);
        continue;
      }

      if (accidental > 2 || accidental < -2) {
        throw new Error(`Unsupported accidental: ${accidental}`);
      }

      let note = naturalLetter;
      const sign = accidental > 0 ? SHARP : FLAT;
      for (let j = 0; j < Math.abs(accidental); j++) {
        note += sign;
      }

      scale.push(note);
    }

    scale.push(scale[0]);
    return scale;
  }

  toString() {
    return this.chordSymbol;
  }
}