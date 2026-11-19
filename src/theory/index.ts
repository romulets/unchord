import Chord, { type RelativeNote } from "./chord";
import { FretBoard, type FretPosition, validateTuning, STANDARD_TUNING } from "./fret_board";

export { Chord, FretBoard, validateTuning, STANDARD_TUNING };
export type { FretPosition, RelativeNote };

export function getChord(chord: string) {
  return new Chord(chord);
}

export function getBoard(tuning?: string[], chord?: Chord) {
  return new FretBoard({tuning, chord});
}
