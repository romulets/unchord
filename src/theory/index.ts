import Chord from "./chord";

export { Chord };

export function getChord(chord: string) {
  return new Chord(chord);
}