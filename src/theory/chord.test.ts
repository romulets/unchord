import { expect, test, describe } from 'vitest'
import Chord from "./chord";

const n = (spelledNote:string, number:number, quality:string) => {
  return {
    spelledNote: spelledNote,
    intervalFromRoot: {quality, number}
  };
};

describe("Chord scale generation", () => {

  describe("Major", () => {
    test("C", () => {
      const chord = new Chord("C");
      expect(chord.quality).toBe("major");
      expect(chord.toneDegrees).toEqual([1, 3, 5]);
      expect(chord.scale).toEqual([
        {
          degree: 1,
          intervalFromRoot: {quality: 'perfect', number: 1},
          pitchClass: 0,
          role: "root",
          spelledNote: "C",
        },
        {
          degree: 2,
          intervalFromRoot: {quality: 'major', number: 2},
          pitchClass: 2,
          role: "second",
          spelledNote: "D",
        },
        {
          degree: 3,
          intervalFromRoot: {quality: 'major', number: 3},
          pitchClass: 4,
          role: "third",
          spelledNote: "E",
        },
        {
          degree: 4,
          intervalFromRoot: {quality: 'perfect', number: 4},
          pitchClass: 5,
          role: "fourth",
          spelledNote: "F",
        },
        {
          degree: 5,
          intervalFromRoot: {quality: 'perfect', number: 5},
          pitchClass: 7,
          role: "fifth",
          spelledNote: "G",
        },
        {
          degree: 6,
          intervalFromRoot: {quality: 'major', number: 6},
          pitchClass: 9,
          role: "sixth",
          spelledNote: "A",
        },
        {
          degree: 7,
          intervalFromRoot: {quality: 'major', number: 7},
          pitchClass: 11,
          role: "seventh",
          spelledNote: "B",
        },
      ]);
    });

    test("C#", () => {
      const chord = new Chord("C#");
      expect(chord.quality).toBe("major");
      expect(chord.scale).toMatchObject([
        n("C#", 1, "perfect"), 
        n("D#", 2, "major"),
        n("E#", 3, "major"),
        n("F#", 4, "perfect"),
        n("G#", 5, "perfect"),
        n("A#", 6, "major"),
        n("B#", 7, "major"),
      ]);
    });

    test("Db (same as C#)", () => {
      const chord = new Chord("Db");
      expect(chord.quality).toBe("major");
      expect(chord.scale).toMatchObject([
        n("Db", 1, "perfect"), 
        n("Eb", 2, "major"),
        n("F", 3, "major"),
        n("Gb", 4, "perfect"),
        n("Ab", 5, "perfect"),
        n("Bb", 6, "major"),
        n("C", 7, "major"),
      ]);
    });

    test("D", () => {
      const chord = new Chord("D");
      expect(chord.quality).toBe("major");
      expect(chord.scale).toMatchObject([
        n("D", 1, "perfect"),
        n("E", 2, "major"),
        n("F#", 3, "major"),
        n("G", 4, "perfect"),
        n("A", 5, "perfect"),
        n("B", 6, "major"),
        n("C#", 7, "major"),
      ]);
    });

    test("E", () => {
      const chord = new Chord("E");
      expect(chord.quality).toBe("major");
      expect(chord.scale).toMatchObject([
        n("E", 1, "perfect"), 
        n("F#", 2, "major"),
        n("G#", 3, "major"),
        n("A", 4, "perfect"),
        n("B", 5, "perfect"),
        n("C#", 6, "major"),
        n("D#", 7, "major"),
      ]);
    });

    test("Fb (same as E)", () => {
      const chord = new Chord("Fb");
      expect(chord.quality).toBe("major");
      expect(chord.scale).toMatchObject([
        n("Fb", 1, "perfect"),
        n("Gb", 2, "major"),
        n("Ab", 3, "major"),
        n("Bbb", 4, "perfect"),
        n("Cb", 5, "perfect"),
        n("Db", 6, "major"),
        n("Eb", 7, "major"),
      ]);
    });

    test("F#", () => {
      const chord = new Chord("F#");
      expect(chord.quality).toBe("major");
      expect(chord.scale).toMatchObject([
        n("F#", 1, "perfect"),
        n("G#", 2, "major"),
        n("A#", 3, "major"),
        n("B", 4, "perfect"),
        n("C#", 5, "perfect"),
        n("D#", 6, "major"),
        n("E#", 7, "major"),
      ]);
    });

    test("Gb (same as F#)", () => {
      const chord = new Chord("Gb");
      expect(chord.quality).toBe("major");
      expect(chord.scale).toMatchObject([
        n("Gb", 1, "perfect"),
        n("Ab", 2, "major"),
        n("Bb", 3, "major"),
        n("Cb", 4, "perfect"),
        n("Db", 5, "perfect"),
        n("Eb", 6, "major"),
        n("F", 7, "major"),
      ]);
    });

    test("G#", () => {
      const chord = new Chord("G#");
      expect(chord.quality).toBe("major");
      expect(chord.scale).toMatchObject([
        n("G#", 1, "perfect"),
        n("A#", 2, "major"),
        n("B#", 3, "major"),
        n("C#", 4, "perfect"),
        n("D#", 5, "perfect"),
        n("E#", 6, "major"),
        n("F##", 7, "major"),
      ]);
    });

    test("B", () => {
      const chord = new Chord("B");
      expect(chord.quality).toBe("major");
      expect(chord.scale).toMatchObject([
        n("B", 1, "perfect"),
        n("C#", 2, "major"),
        n("D#", 3, "major"),
        n("E", 4, "perfect"),
        n("F#", 5, "perfect"),
        n("G#", 6, "major"),
        n("A#", 7, "major"),
      ]);
    });

    test("B#", () => {
      const chord = new Chord("B#");
      expect(chord.quality).toBe("major");
      expect(chord.scale).toMatchObject([
        n("B#", 1, "perfect"),
        n("C##", 2, "major"),
        n("D##", 3, "major"),
        n("E#", 4, "perfect"),
        n("F##", 5, "perfect"),
        n("G##", 6, "major"),
        n("A##", 7, "major"),
      ]);
    });

    test("Cb (same as B)", () => {
      const chord = new Chord("Cb");
      expect(chord.quality).toBe("major");
      expect(chord.scale).toMatchObject([
        n("Cb", 1, "perfect"),
        n("Db", 2, "major"),
        n("Eb", 3, "major"),
        n("Fb", 4, "perfect"),
        n("Gb", 5, "perfect"),
        n("Ab", 6, "major"),
        n("Bb", 7, "major"),
      ]);
    });
  });

  describe("Minor", () => {
    test("Cm", () => {
      const chord = new Chord("Cm");
      expect(chord.quality).toBe("minor");
      expect(chord.toneDegrees).toEqual([1, 3, 5]);
      expect(chord.scale).toEqual([
          {
            degree: 1,
            intervalFromRoot: {quality: 'perfect', number: 1},
            pitchClass: 0,
            role: "root",
            spelledNote: "C",
          },
          {
            degree: 2,
            intervalFromRoot: {quality: 'major', number: 2},
            pitchClass: 2,
            role: "second",
            spelledNote: "D",
          },
          {
            degree: 3,
            intervalFromRoot: {quality: 'minor', number: 3},
            pitchClass: 3,
            role: "third",
            spelledNote: "Eb",
          },
          {
            degree: 4,
            intervalFromRoot: {quality: 'perfect', number: 4},
            pitchClass: 5,
            role: "fourth",
            spelledNote: "F",
          },
          {
            degree: 5,
            intervalFromRoot: {quality: 'perfect', number: 5},
            pitchClass: 7,
            role: "fifth",
            spelledNote: "G",
          },
          {
            degree: 6,
            intervalFromRoot: {quality: 'minor', number: 6},
            pitchClass: 8,
            role: "sixth",
            spelledNote: "Ab",
          },
          {
            degree: 7,
            intervalFromRoot: {quality: 'minor', number: 7},
            pitchClass: 10,
            role: "seventh",
            spelledNote: "Bb",
          },
        ]);
    });

    test("C#m", () => {
      const chord = new Chord("C#m");
      expect(chord.quality).toBe("minor");
      expect(chord.scale).toMatchObject([
        n("C#", 1, "perfect"),
        n("D#", 2, "major"),
        n("E", 3, "minor"),
        n("F#", 4, "perfect"),
        n("G#", 5, "perfect"),
        n("A", 6, "minor"),
        n("B", 7, "minor"),
      ]);
    });

    test("Dmin", () => {
      const chord = new Chord("Dmin");
      expect(chord.quality).toBe("minor");
      expect(chord.scale).toMatchObject([
        n("D", 1, "perfect"),
        n("E", 2, "major"),
        n("F", 3, "minor"),
        n("G", 4, "perfect"),
        n("A", 5, "perfect"),
        n("Bb", 6, "minor"),
        n("C", 7, "minor"),
      ]);
    });

    test("A#min", () => {
      const chord = new Chord("A#min");
      expect(chord.quality).toBe("minor");
      expect(chord.scale).toMatchObject([
        n("A#", 1, "perfect"),
        n("B#", 2, "major"),
        n("C#", 3, "minor"),
        n("D#", 4, "perfect"),
        n("E#", 5, "perfect"),
        n("F#", 6, "minor"),
        n("G#", 7, "minor"),
      ]);
    });

    test("A-", () => {
      const chord = new Chord("A-");
      expect(chord.quality).toBe("minor");
      expect(chord.scale).toMatchObject([
        n("A", 1, "perfect"),
        n("B", 2, "major"),
        n("C", 3, "minor"),
        n("D", 4, "perfect"),
        n("E", 5, "perfect"),
        n("F", 6, "minor"),
        n("G", 7, "minor"),
      ]);
    });

    test("Abmin", () => {
      const chord = new Chord("Abmin");
      expect(chord.quality).toBe("minor");
      expect(chord.scale).toMatchObject([
        n("Ab", 1, "perfect"),
        n("Bb", 2, "major"),
        n("Cb", 3, "minor"),
        n("Db", 4, "perfect"),
        n("Eb", 5, "perfect"),
        n("Fb", 6, "minor"),
        n("Gb", 7, "minor"),
      ]);
    });

    test("Fb-", () => {
      const chord = new Chord("Fb-");
      expect(chord.quality).toBe("minor");
      expect(chord.scale).toMatchObject([
        n("Fb", 1, "perfect"),
        n("Gb", 2, "major"),
        n("Abb", 3, "minor"),
        n("Bbb", 4, "perfect"),
        n("Cb", 5, "perfect"),
        n("Dbb", 6, "minor"),
        n("Ebb", 7, "minor"),
      ]);
    });
  });

  describe("Invalid chords", () => {
    test("Empty string", () => {
      expect(() => new Chord("")).toThrow("Invalid chord");
    });

    test("Invalid chord (bad letter)", () => {
      expect(() => new Chord("H")).toThrow("Invalid chord");
    });

    test("Invalid modifier", () => {
      expect(() => new Chord("Cx")).toThrow("Invalid chord");
    });

    test("Invalid chord (bad composition)", () => {
      expect(() => new Chord("C#123123")).toThrow("Invalid chord");
    });

  });


})

