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
        { part: "m", meaning: "minor_symbol" },
      ]);
    });

    it("B##m", () => {
      expect(interpretChord("B##m")).toEqual([
        { part: "B", meaning: "root_letter" },
        { part: "#", meaning: "accidental" },
        { part: "#", meaning: "accidental" },
        { part: "m", meaning: "minor_symbol" },
      ]);
    });

    it("F#min", () => {
      expect(interpretChord("F#min")).toEqual([
        { part: "F", meaning: "root_letter" },
        { part: "#", meaning: "accidental" },
        { part: "min", meaning: "minor_symbol" },
      ]);
    });

    it("Ebb-", () => {
      expect(interpretChord("Ebb-")).toEqual([
        { part: "E", meaning: "root_letter" },
        { part: "b", meaning: "accidental" },
        { part: "b", meaning: "accidental" },
        { part: "-", meaning: "minor_symbol" },
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
        { part: "m", meaning: "minor_symbol" },
        { part: "/", meaning: "slash" },
        { part: "G", meaning: "bass_letter" }
      ]);
    });

    it("E-/D", () => {
      expect(interpretChord("E-/D")).toEqual([
        { part: "E", meaning: "root_letter" },
        { part: "-", meaning: "minor_symbol" },
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
        { part: "min", meaning: "minor_symbol" },
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
  });
});