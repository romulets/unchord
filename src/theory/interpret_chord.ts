import { ACCIDENTALS, NOTE_LETTERS } from "./notes";

// ORDER ACTUALLY MATTERS.
// we check for the longest matching minor quality symbol first to avoid conflicts with shorter 
// symbols like "m" being matched before "min"
const MINOR_QUALITY_SYMBOLS = ["min", "m", "-"];
const SLASH_SEPARATOR = "/";
const MAX_ACCIDENTAL_COUNT = 2;

type ChordPartMeaning = "root_letter" | "accidental" | "minor_symbol" | "slash" | "bass_letter" | "bass_accidental";

interface ChordPart {
  part: string;
  meaning: ChordPartMeaning;
}

const CHORD_VALIDATION_ERROR = "Invalid chord (only supported chords are major and minor)";

export function interpretChord(chord: string): ChordPart[] {
  const interpreted: ChordPart[] = [];
  if (chord.length === 0) {
    throw new Error(CHORD_VALIDATION_ERROR)
  }

  let existingAccidental: string | undefined = undefined;
  for (let i = 0; i < chord.length; i++) {
    const part = chord[i];

    if (i === 0) {
      if (!NOTE_LETTERS.includes(part)) {
        throw new Error(CHORD_VALIDATION_ERROR);
      }
      interpreted.push({ part, meaning: "root_letter" });
      continue;
    }

    if (ACCIDENTALS.includes(part)) {
      if ((existingAccidental && existingAccidental !== part) || countAccidentals(interpreted) >= MAX_ACCIDENTAL_COUNT) {
        throw new Error(CHORD_VALIDATION_ERROR);
      }
      interpreted.push({ part, meaning: "accidental" });
      existingAccidental = part;
      continue;
    }

    const minorPart = checkMinor(chord.substring(i));
    if (minorPart) {
      if (countMinorSymbols(interpreted) > 0) {
        throw new Error(CHORD_VALIDATION_ERROR);
      }
      interpreted.push(minorPart);
      i += minorPart.part.length - 1;
      continue;
    }

    if (part == SLASH_SEPARATOR) {
      interpreted.push({ part: SLASH_SEPARATOR, meaning: "slash" });
      if (startsWithLetter(chord.substring(i + 1))) {
        interpreted.push(...findBassParts(chord.substring(i + 1)));
      } else {
        // We don't support non bass stuff after slash yet;
        throw new Error(CHORD_VALIDATION_ERROR);
      }
      break
    }

    throw new Error(CHORD_VALIDATION_ERROR);
  }

  return interpreted;
}

function checkMinor(substring: string): ChordPart | undefined {
  const minorSymbol = getSymbolIfNext(substring, MINOR_QUALITY_SYMBOLS);
  if (minorSymbol) {
    return { part: minorSymbol, meaning: "minor_symbol" };
  }
}

function getSymbolIfNext(substring: string, symbols: string[]): string {
  for (const symbol of symbols) {
    if (substring.startsWith(symbol)) {
      return symbol;
    }
  }
  return "";
}

function countAccidentals(parts: ChordPart[]) {
  return parts.filter(p => p.meaning === "accidental").length;
}

function countMinorSymbols(parts: ChordPart[]) {
  return parts.filter(p => p.meaning === "minor_symbol").length;
}

function startsWithLetter(substring: string): boolean {
  if (substring.length === 0) {
    return false;
  }
  return NOTE_LETTERS.includes(substring[0]);
}

function findBassParts(substring: string): ChordPart[] {
  const parts = interpretChord(substring);
  if (parts.some(p => p.meaning !== "root_letter" && p.meaning !== "accidental")) {
    throw new Error(CHORD_VALIDATION_ERROR);
  }

  return parts.map(p => {
    if (p.meaning === "root_letter") {
      return { part: p.part, meaning: "bass_letter" };
    }
    if (p.meaning === "accidental") {
      return { part: p.part, meaning: "bass_accidental" };
    }
    throw new Error(CHORD_VALIDATION_ERROR);
  });
}