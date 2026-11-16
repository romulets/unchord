import { expect, test, describe } from 'vitest'
import Chord from "./chord";

describe("Chord scale generation", () => {

  describe("Major", () => {
    test("C", () => {
      const chord = new Chord("C");
      expect(chord.majorScale).toEqual(["C", "D", "E", "F", "G", "A", "B", "C"]);
      expect(chord.quality).toBe("major");
      expect(chord.notes).toStrictEqual({
        0: "Root",
        2: "Third",
        4: "Fifth"
      });
    });

    test("C#", () => {
      const chord = new Chord("C#");
      expect(chord.majorScale).toEqual(["C#", "D#", "E#", "F#", "G#", "A#", "B#", "C#"]);
      expect(chord.quality).toBe("major");
      expect(chord.notes).toStrictEqual({
        0: "Root",
        2: "Third",
        4: "Fifth"
      })
    });

    test("Db (same as C#)", () => {
      const chord = new Chord("Db");
      expect(chord.majorScale).toEqual(["Db", "Eb", "F", "Gb", "Ab", "Bb", "C", "Db"]);
      expect(chord.quality).toBe("major");
      expect(chord.notes).toStrictEqual({
        0: "Root",
        2: "Third",
        4: "Fifth"
      })
    });

    test("D", () => {
      const chord = new Chord("D");
      expect(chord.majorScale).toEqual(["D", "E", "F#", "G", "A", "B", "C#", "D"]);
      expect(chord.quality).toBe("major");
      expect(chord.notes).toStrictEqual({
        0: "Root",
        2: "Third",
        4: "Fifth"
      })
    });

    test("E", () => {
      const chord = new Chord("E");
      expect(chord.majorScale).toEqual(["E", "F#", "G#", "A", "B", "C#", "D#", "E"]);
      expect(chord.quality).toBe("major");
      expect(chord.notes).toStrictEqual({
        0: "Root",
        2: "Third",
        4: "Fifth"
      })
    });

    test("Fb (same as E)", () => {
      const chord = new Chord("Fb");
      expect(chord.majorScale).toEqual(["Fb", "Gb", "Ab", "Bbb", "Cb", "Db", "Eb", "Fb"]);
      expect(chord.quality).toBe("major");
      expect(chord.notes).toStrictEqual({
        0: "Root",
        2: "Third",
        4: "Fifth"
      })
    });

    test("F#", () => {
      const chord = new Chord("F#");
      expect(chord.majorScale).toEqual(["F#", "G#", "A#", "B", "C#", "D#", "E#", "F#"]);
      expect(chord.quality).toBe("major");
      expect(chord.notes).toStrictEqual({
        0: "Root",
        2: "Third",
        4: "Fifth"
      })
    });

     test("Gb", () => {
      const chord = new Chord("Gb");
      expect(chord.majorScale).toEqual(["Gb", "Ab", "Bb", "Cb", "Db", "Eb", "F", "Gb"]);
      expect(chord.quality).toBe("major");
    });

    test("G#", () => {
      const chord = new Chord("G#");
      expect(chord.majorScale).toEqual(["G#", "A#", "B#", "C#", "D#", "E#", "F##", "G#"]);
      expect(chord.quality).toBe("major");
      expect(chord.notes).toStrictEqual({
        0: "Root",
        2: "Third",
        4: "Fifth"
      })
    });

    test("B", () => {
      const chord = new Chord("B");
      expect(chord.majorScale).toEqual(["B", "C#", "D#", "E", "F#", "G#", "A#", "B"]);
      expect(chord.quality).toBe("major");
      expect(chord.notes).toStrictEqual({
        0: "Root",
        2: "Third",
        4: "Fifth"
      })
    });

    test("B#", () => {
      const chord = new Chord("B#");
      expect(chord.majorScale).toEqual(["B#", "C##", "D##", "E#", "F##", "G##", "A##", "B#"]);
      expect(chord.quality).toBe("major");
      expect(chord.notes).toStrictEqual({
        0: "Root",
        2: "Third",
        4: "Fifth"
      })
    });


    test("Cb (same as B)", () => {
      const chord = new Chord("Cb");
      expect(chord.majorScale).toEqual(["Cb", "Db", "Eb", "Fb", "Gb", "Ab", "Bb", "Cb"]);
      expect(chord.quality).toBe("major");
      expect(chord.notes).toStrictEqual({
        0: "Root",
        2: "Third",
        4: "Fifth"
      })
    });
  });
  
  describe("Minor", () => {
     test("Cm", () => {
      const chord = new Chord("Cm");
      expect(chord.majorScale).toEqual(["C", "D", "E", "F", "G", "A", "B", "C"]);
      expect(chord.quality).toBe("minor");
      expect(chord.notes).toStrictEqual({
        0: "Root",
        2: "Third",
        4: "Fifth"
      });
    });
  });

  describe("Invalid notes", () => {
    test("Empty string", () => {
      expect(() => new Chord("")).toThrow("Invalid chord");
    });

    test("Invalid note", () => {
      expect(() => new Chord("H")).toThrow("Invalid chord");
    });

    test("Invalid modifier", () => {
      expect(() => new Chord("Cx")).toThrow("Invalid chord");
    });
  });


})

