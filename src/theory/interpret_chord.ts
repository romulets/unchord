import { ACCIDENTALS, NOTE_LETTERS } from "./notes";

const OFFICIAL_MINOR_QUALITY_SYMBOL = "min";
// ORDER ACTUALLY MATTERS.
// we check for the longest matching minor quality symbol first to avoid conflicts with shorter 
// symbols like "m" being matched before "min"
const MINOR_QUALITY_SYMBOLS = [OFFICIAL_MINOR_QUALITY_SYMBOL, "m", "-"];

const SLASH_SEPARATOR = "/";
const MAX_ACCIDENTAL_COUNT = 2;

// ORDER ACTUALLY MATTERS.
// we check for the longest matching extension first to avoid conflicts with shorter 
// symbols like "1" being matched before "11"
const EXTENSIONS = ["11", "13", "5", "7", "9"];
const OFFICIAL_MAJOR_EXTENSION_QUALITY = "maj";
const MAJOR_EXTENSION_QUALITIES = [OFFICIAL_MAJOR_EXTENSION_QUALITY, "Maj", "M", "Δ"];

type ChordPartMeaning = "root_letter"
  | "accidental"
  | "minor_quality"
  | "slash"
  | "bass_letter"
  | "bass_accidental"
  | "extension"
  | "major_seventh_marker";

export interface ChordPart {
  part: string;
  meaning: ChordPartMeaning;
}

interface ChordPartFind {
  skipChars: number;
  chordParts: ChordPart[];
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
      if ((existingAccidental && existingAccidental !== part) || count(interpreted, "accidental") >= MAX_ACCIDENTAL_COUNT) {
        throw new Error(CHORD_VALIDATION_ERROR);
      }
      interpreted.push({ part, meaning: "accidental" });
      existingAccidental = part;
      continue;
    }

    const extensionPart = checkExtension(chord.substring(i));
    if (extensionPart) {
      if (count(interpreted, "extension") > 0) {
        throw new Error(CHORD_VALIDATION_ERROR);
      }
      interpreted.push(...extensionPart.chordParts);
      i += extensionPart.skipChars;
      continue;
    }

    const majorSeventhMarkerPart = checkMajorSeventhMarkerPart(chord.substring(i));
    if (majorSeventhMarkerPart) {
      if (count(interpreted, "major_seventh_marker") > 0
          // Can only happen before an extension is added
          || count(interpreted, "extension") > 0) {
        throw new Error(CHORD_VALIDATION_ERROR);
      }
      // Fallback to official symbols (simplify it)
      interpreted.push(...majorSeventhMarkerPart.chordParts);

      i += majorSeventhMarkerPart.skipChars;
      continue;
    }

    // It has to come after of extensions because "m" matches too much
    const minorPart = checkMinor(chord.substring(i));
    if (minorPart) {
      if (count(interpreted, "minor_quality") > 0
          // Can only happen before an extension is added
          || count(interpreted, "extension") > 0
          || count(interpreted, "major_seventh_marker") > 0) {
        throw new Error(CHORD_VALIDATION_ERROR);
      }
      // Fallback to official symbols (simplify it)
      interpreted.push(...minorPart.chordParts);
      i += minorPart.skipChars;
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

    // console.log(`Unrecognized part: ${part}, current parts ${JSON.stringify(interpreted)}`);
    throw new Error(CHORD_VALIDATION_ERROR);
  }

  return interpreted;
}

function checkMinor(substring: string): ChordPartFind | undefined {
  const minorSymbol = getSymbolIfNext(substring, MINOR_QUALITY_SYMBOLS);
  if (minorSymbol) {
    return { chordParts: [{ part: OFFICIAL_MINOR_QUALITY_SYMBOL, meaning: "minor_quality" }], skipChars: minorSymbol.length - 1 };
  }
}

function checkExtension(substring: string): ChordPartFind | undefined {
  const extensionSymbol = getSymbolIfNext(substring, EXTENSIONS);
  if (extensionSymbol) {
    return { chordParts: [{ part: extensionSymbol, meaning: "extension" }], skipChars: extensionSymbol.length - 1 };
  }
}

function checkMajorSeventhMarkerPart(substring: string): ChordPartFind | undefined {
  if (substring[0] === "(") {
    let toSkip = 1;
    const afterParenthesis = substring.substring(1);
    const majorSeventhnMaker = getSymbolIfNext(afterParenthesis, MAJOR_EXTENSION_QUALITIES);

    toSkip += majorSeventhnMaker.length;
    const afterMajorExtensionMaker = afterParenthesis.substring(majorSeventhnMaker.length);
    const extensionMarker = checkExtension(afterMajorExtensionMaker) || { chordParts: [], skipChars: -1};
    if (!majorSeventhnMaker) {
      throw new Error(CHORD_VALIDATION_ERROR);
    }

    // Adding 1 because we reusing the logic of the main loop
    // 0 means it will be skipped later
    toSkip += extensionMarker.skipChars + 1;
    const afterExtension = afterMajorExtensionMaker.substring(extensionMarker.skipChars + 1);
    if (afterExtension[0] !== ")") {
      throw new Error(CHORD_VALIDATION_ERROR);
    }

    return { chordParts: [
      { part: OFFICIAL_MAJOR_EXTENSION_QUALITY, meaning: "major_seventh_marker" },
      ...extensionMarker.chordParts
    ],
    // don't subtract any because we will skip the closing parenthesis in the main loop
     skipChars: toSkip };
  }

  const majorExtensionMaker = getSymbolIfNext(substring, MAJOR_EXTENSION_QUALITIES);
  if (majorExtensionMaker) {
    return { chordParts: [{ part: OFFICIAL_MAJOR_EXTENSION_QUALITY, meaning: "major_seventh_marker" }], skipChars: majorExtensionMaker.length - 1 };
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

function count(parts: ChordPart[], meaning: ChordPartMeaning) {
  return parts.filter(p => p.meaning === meaning).length;
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