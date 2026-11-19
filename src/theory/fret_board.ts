import type Chord from "./chord";
import { ACCIDENTALS, getPitchClass, NOTE_LETTERS, wrapPitchClass } from "./notes";

export const STANDARD_TUNING = ["E", "A", "D", "G", "B", "E"];

const STRINGS = 6;
const FRETS = 16;

interface FretBoardProps {
  tuning?: string[];
  chord?: Chord;
}

export type PositionRole = "root" | "bass" | "tone"; 
export interface FretPosition {
  pitchClass: number;
  spelledNote?: string;
  roles: PositionRole[];
}

export class FretBoard {
  readonly tuning: string[];
  readonly board: FretPosition[][];
  readonly chord: Chord | undefined;

  constructor({ tuning = STANDARD_TUNING, chord }: FretBoardProps) {
    if (!validateTuning(tuning).every(Boolean)) {
      throw new Error(`Invalid note in tuning: ${tuning.concat(", ")}`);
    }
    
    this.tuning = tuning;
    this.board = this.buildBoard(tuning, chord);
    this.chord = chord;
  }

  private buildBoard(tuning: string[], chord?: Chord): FretPosition[][] {
    const board: FretPosition[][] = [];

    for (let i = 0; i < tuning.length; i++) {
      const openString = tuning[i];
      board.push(this.buildString(openString, chord));
    }
    return board;
  }

  private buildString(openString: string, chord?: Chord): FretPosition[] {
    const { pitchClass: openStringPitchClass } = getPitchClass(openString);

    const pitchClassIndex = chord?.getTones()
      .map(tone => ({ [tone.pitchClass]: tone }))
      .reduce((acc, incoming) => ({ ...acc, ...incoming }), {});

    const frets: FretPosition[] = [];
    for (let fret = 0; fret < FRETS; fret++) {
      const pitchClass = wrapPitchClass(openStringPitchClass + fret);
      
      const roles: PositionRole[] = [];
      let { spelledNote } = pitchClassIndex?.[pitchClass] ?? {};
      
      if (pitchClass === chord?.bassNote.pitchClass) {
        roles.push("bass");
        ({ spelledNote } = chord.bassNote);
      }

      if (pitchClass === chord?.rootNote.pitchClass) {
          roles.push("root");
      }

      if (pitchClassIndex && pitchClassIndex[pitchClass]) {
        roles.push("tone");
      }

      frets.push({ pitchClass, roles, spelledNote });
    }
    return frets.reverse();
  }
}

export function validateTuning(tuning: string[]) {
  if (tuning.length !== STRINGS) {
    return Array(STRINGS).fill(false);
  }

  const validation = [];
  for (const note of tuning) {
    if (note.length === 0 || note.length > 2) {
      validation.push(false);
      continue;
    }

    if (!NOTE_LETTERS.includes(note[0])) {
      validation.push(false);
      continue;
    }

    if (note.length === 2 && !ACCIDENTALS.includes(note[1])) {
      validation.push(false);
      continue;
    }

    validation.push(true);
  }

  return validation;
}