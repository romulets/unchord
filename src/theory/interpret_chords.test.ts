import { describe, it, expect } from "vitest";
import { interpretChord } from "./interpret_chord";

describe("interpretChords", () => {
  describe("major", () => {
    it("C", () => {
      expect(interpretChord("C")).toEqual([
        { part: "C", meaning: "root_letter" }
      ]);
    });

    it("Cb", () => {
      expect(interpretChord("Cb")).toEqual([
        { part: "C", meaning: "root_letter" },
        { part: "b", meaning: "accidental" }
      ]);
    });

    it("Abb", () => {
      expect(interpretChord("Abb")).toEqual([
        { part: "A", meaning: "root_letter" },
        { part: "b", meaning: "accidental" },
        { part: "b", meaning: "accidental" }
      ]);
    });

    it("D#", () => {
      expect(interpretChord("D#")).toEqual([
        { part: "D", meaning: "root_letter" },
        { part: "#", meaning: "accidental" },
      ]);
    });

    it("G##", () => {
      expect(interpretChord("G##")).toEqual([
        { part: "G", meaning: "root_letter" },
        { part: "#", meaning: "accidental" },
        { part: "#", meaning: "accidental" },
      ]);
    });
  });

  describe("minor", () => {
    it("Cm", () => {
      expect(interpretChord("Cm")).toEqual([
        { part: "C", meaning: "root_letter" },
        { part: "min", meaning: "minor_quality" },
      ]);
    });

    it("B##m", () => {
      expect(interpretChord("B##m")).toEqual([
        { part: "B", meaning: "root_letter" },
        { part: "#", meaning: "accidental" },
        { part: "#", meaning: "accidental" },
        { part: "min", meaning: "minor_quality" },
      ]);
    });

    it("F#min", () => {
      expect(interpretChord("F#min")).toEqual([
        { part: "F", meaning: "root_letter" },
        { part: "#", meaning: "accidental" },
        { part: "min", meaning: "minor_quality" },
      ]);
    });

    it("Ebb-", () => {
      expect(interpretChord("Ebb-")).toEqual([
        { part: "E", meaning: "root_letter" },
        { part: "b", meaning: "accidental" },
        { part: "b", meaning: "accidental" },
        { part: "min", meaning: "minor_quality" },
      ]);
    });
  });

  describe("bass", () => {
    it("C/G", () => {
      expect(interpretChord("C/G")).toEqual([
        { part: "C", meaning: "root_letter" },
        { part: "/", meaning: "slash" },
        { part: "G", meaning: "bass_letter" }
      ]);
    });

    it("Am/G", () => {
      expect(interpretChord("Am/G")).toEqual([
        { part: "A", meaning: "root_letter" },
        { part: "min", meaning: "minor_quality" },
        { part: "/", meaning: "slash" },
        { part: "G", meaning: "bass_letter" }
      ]);
    });

     it("Am/G#", () => {
      expect(interpretChord("Am/G#")).toEqual([
        { part: "A", meaning: "root_letter" },
        { part: "min", meaning: "minor_quality" },
        { part: "/", meaning: "slash" },
        { part: "G", meaning: "bass_letter" },
        { part: "#", meaning: "bass_accidental" }
      ]);
    });

    it("E-/D", () => {
      expect(interpretChord("E-/D")).toEqual([
        { part: "E", meaning: "root_letter" },
        { part: "min", meaning: "minor_quality" },
        { part: "/", meaning: "slash" },
        { part: "D", meaning: "bass_letter" }
      ]);
    });

    it("D/F#", () => {
      expect(interpretChord("D/F#")).toEqual([
        { part: "D", meaning: "root_letter" },
        { part: "/", meaning: "slash" },
        { part: "F", meaning: "bass_letter" },
        { part: "#", meaning: "bass_accidental" }
      ]);
    });

    it("A##/Bb", () => {
      expect(interpretChord("A##/Bb")).toEqual([
        { part: "A", meaning: "root_letter" },
        { part: "#", meaning: "accidental" },
        { part: "#", meaning: "accidental" },
        { part: "/", meaning: "slash" },
        { part: "B", meaning: "bass_letter" },
        { part: "b", meaning: "bass_accidental" }
      ]);
    });
    it("A##min/Bb", () => {
      expect(interpretChord("A##min/Bb")).toEqual([
        { part: "A", meaning: "root_letter" },
        { part: "#", meaning: "accidental" },
        { part: "#", meaning: "accidental" },
        { part: "min", meaning: "minor_quality" },
        { part: "/", meaning: "slash" },
        { part: "B", meaning: "bass_letter" },
        { part: "b", meaning: "bass_accidental" }
      ]);
    });

    it("F##/Ebb", () => {
      expect(interpretChord("F##/Ebb")).toEqual([
        { part: "F", meaning: "root_letter" },
        { part: "#", meaning: "accidental" },
        { part: "#", meaning: "accidental" },
        { part: "/", meaning: "slash" },
        { part: "E", meaning: "bass_letter" },
        { part: "b", meaning: "bass_accidental" },
        { part: "b", meaning: "bass_accidental" }
      ]);
    });
  });

  describe("extensions", () => {
    it("C7", () => {
      expect(interpretChord("C7")).toEqual([
        { part: "C", meaning: "root_letter" },
        { part: "7", meaning: "extension" }
      ]);
    });

     it("Cmaj", () => {
      expect(interpretChord("Cmaj")).toEqual([
        { part: "C", meaning: "root_letter" },
        { part: "maj", meaning: "major_seventh_marker" }
      ]);
    });

    it("A11", () => {
      expect(interpretChord("A11")).toEqual([
        { part: "A", meaning: "root_letter" },
        { part: "11", meaning: "extension" }
      ]);
    });

    it("B13", () => {
      expect(interpretChord("B13")).toEqual([
        { part: "B", meaning: "root_letter" },
        { part: "13", meaning: "extension" }
      ]);
    });

    it("CminMaj7", () => {
      expect(interpretChord("CminMaj7")).toEqual([
        { part: "C", meaning: "root_letter" },
        { part: "min", meaning: "minor_quality" },
        { part: "maj", meaning: "major_seventh_marker" },
        { part: "7", meaning: "extension" }
      ]);
    });

    it("Cm(maj7)", () => {
      expect(interpretChord("Cm(maj7)")).toEqual([
        { part: "C", meaning: "root_letter" },
        { part: "min", meaning: "minor_quality" },
        { part: "maj", meaning: "major_seventh_marker" },
        { part: "7", meaning: "extension" }
      ]);
    });

     it("Cmmaj7", () => {
      expect(interpretChord("Cmmaj7")).toEqual([
        { part: "C", meaning: "root_letter" },
        { part: "min", meaning: "minor_quality" },
        { part: "maj", meaning: "major_seventh_marker" },
        { part: "7", meaning: "extension" }
      ]);
    });

    it("C7/E", () => {
      expect(interpretChord("C7/E")).toEqual([
        { part: "C", meaning: "root_letter" },
        { part: "7", meaning: "extension" },
        { part: "/", meaning: "slash" },
        { part: "E", meaning: "bass_letter" }
      ]);
    });

    it("Dm9", () => {
      expect(interpretChord("Dm9")).toEqual([
        { part: "D", meaning: "root_letter" },
        { part: "min", meaning: "minor_quality" },
        { part: "9", meaning: "extension" }
      ]);
    });

    it("Bm9/E", () => {
      expect(interpretChord("Bm9/E")).toEqual([
        { part: "B", meaning: "root_letter" },
        { part: "min", meaning: "minor_quality" },
        { part: "9", meaning: "extension" },
        { part: "/", meaning: "slash" },
        { part: "E", meaning: "bass_letter" }
      ]);
    });


    it("Cmaj7 (CM7) (CΔ7)", () => {
      expect(interpretChord("Cmaj7")).toEqual([
        { part: "C", meaning: "root_letter" },
        { part: "maj", meaning: "major_seventh_marker" },
        { part: "7", meaning: "extension" }
      ]);
    });

    it("CmM7", () => {
      expect(interpretChord("CmM7")).toEqual([
        { part: "C", meaning: "root_letter" },
        { part: "min", meaning: "minor_quality" },
        { part: "maj", meaning: "major_seventh_marker" },
        { part: "7", meaning: "extension" }
      ]);
    });

     it("CΔ7", () => {
      expect(interpretChord("CΔ7")).toEqual([
        { part: "C", meaning: "root_letter" },
        { part: "maj", meaning: "major_seventh_marker" },
        { part: "7", meaning: "extension" }
      ]);
    });
  })

  describe("errors", () => {
    it("empty string", () => {
      expect(() => interpretChord("")).toThrow();
    });

    it("too many accidentals", () => {
      expect(() => interpretChord("C###")).toThrow();
      expect(() => interpretChord("Cbbbs")).toThrow();
    });

    it("invalid chord", () => {
      expect(() => interpretChord("H")).toThrow();
    });

    it("too many minors", () => {
      expect(() => interpretChord("Cm-")).toThrow();
      expect(() => interpretChord("C--")).toThrow();
      expect(() => interpretChord("Cminm")).toThrow();
    });

    it("Bad bass", () => {
      expect(() => interpretChord("A##min/Bbbb")).toThrow();
      expect(() => interpretChord("A##min/Bb#")).toThrow();
      expect(() => interpretChord("A##min/Bm")).toThrow();
      expect(() => interpretChord("A##min/B-")).toThrow();
    });

    it("Inverse extensions", () => {
      expect(() => interpretChord("C7m")).toThrow();
      expect(() => interpretChord("C7maj")).toThrow();
    });
  });
});