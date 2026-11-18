export const REFERENCE_INTERVAL_TABLE = {
  "C": 0,
  "D": 2,
  "E": 4,
  "F": 5,
  "G": 7,
  "A": 9,
  "B": 11
}

export const NOTE_LETTERS = Object.keys(REFERENCE_INTERVAL_TABLE);
export const LETTER_PITCH_CLASSES = Object.values(REFERENCE_INTERVAL_TABLE);

type Accidental = "b" | "#";
export const FLAT_ACC = "b";
export const SHARP_ACC = "#"
export const ACCIDENTALS = [FLAT_ACC, SHARP_ACC];
const ACCIDENTAL_WEIGHT = {
  [FLAT_ACC]: -1,
  [SHARP_ACC]: 1
}

export function getPitchClass(note: string) {
  const letterIndex = NOTE_LETTERS.indexOf(note[0]);
  if (letterIndex === -1) {
    throw new Error(`Invalid note: ${note}`);
  }
  const pitchClass = wrapPitchClass(LETTER_PITCH_CLASSES[letterIndex] + accidentalOffset(note));
  return { letterIndex, pitchClass };
}

export function wrapPitchClass(pitchClass: number) {
  while (pitchClass < 0) {
    pitchClass += 12;
  }
  return pitchClass % 12;
}

export function accidentalOffset(note: string) {
  if (note.length < 2) {
    return 0;
  }

  if (!ACCIDENTALS.includes(note[1])) {
    return 0;
  }

  const accidental: Accidental = note[1] as Accidental;
  let offset = ACCIDENTAL_WEIGHT[accidental];

  for (let i = 2; i < note.length; i++) {
    if (note[i] !== accidental) {
      return offset
    }

    offset += ACCIDENTAL_WEIGHT[accidental];
  }

  return offset;
}