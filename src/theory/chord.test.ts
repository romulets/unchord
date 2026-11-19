import { expect, test, describe } from 'vitest'
import Chord from "./chord";

const n = (spelledNote: string, number: number, quality: string) => {
  return {
    spelledNote: spelledNote,
    intervalFromRoot: { quality, number }
  };
};

describe("Chord scale generation", () => {

  describe("Major", () => {
    test("C", () => {
      const chord = new Chord("C");
      expect(chord.quality).toBe("major");
      expect(chord.rootNote).toMatchObject(n("C", 1, "perfect"));
      expect(chord.bassNote).toMatchObject(n("C", 1, "perfect"));
      expect(chord.tones).toMatchObject([n("C", 1, "perfect"), n("E", 3, "major"), n("G", 5, "perfect")]);
      expect(chord.scale).toEqual([
        {
          degree: 1,
          intervalFromRoot: { quality: 'perfect', number: 1 },
          pitchClass: 0,
          role: "root",
          spelledNote: "C",
          tone: true,
        },
        {
          degree: 2,
          intervalFromRoot: { quality: 'major', number: 2 },
          pitchClass: 2,
          role: "second",
          spelledNote: "D",
          tone: false,
        },
        {
          degree: 3,
          intervalFromRoot: { quality: 'major', number: 3 },
          pitchClass: 4,
          role: "third",
          spelledNote: "E",
          tone: true,
        },
        {
          degree: 4,
          intervalFromRoot: { quality: 'perfect', number: 4 },
          pitchClass: 5,
          role: "fourth",
          spelledNote: "F",
          tone: false,
        },
        {
          degree: 5,
          intervalFromRoot: { quality: 'perfect', number: 5 },
          pitchClass: 7,
          role: "fifth",
          spelledNote: "G",
          tone: true,
        },
        {
          degree: 6,
          intervalFromRoot: { quality: 'major', number: 6 },
          pitchClass: 9,
          role: "sixth",
          spelledNote: "A",
          tone: false,
        },
        {
          degree: 7,
          intervalFromRoot: { quality: 'major', number: 7 },
          pitchClass: 11,
          role: "seventh",
          spelledNote: "B",
          tone: false,
        },
      ]);
    });

    test("C/C#", () => {
      const chord = new Chord("C/C#");
      expect(chord.quality).toBe("major");
      expect(chord.rootNote).toMatchObject(n("C", 1, "perfect"));
      expect(chord.bassNote).toMatchObject(n("C#", 1, "augmented"));
    });

    test("C/C##", () => {
      const chord = new Chord("C/C##");
      expect(chord.quality).toBe("major");
      expect(chord.rootNote).toMatchObject(n("C", 1, "perfect"));
      expect(chord.bassNote).toMatchObject(n("C##", 1, "doubly augmented"));
      expect(chord.tones).toMatchObject([n("C", 1, "perfect"), n("E", 3, "major"), n("G", 5, "perfect")]);
    });

    test("Cb/E#", () => {
      const chord = new Chord("Cb/E#");
      expect(chord.quality).toBe("major");
      expect(chord.rootNote).toMatchObject(n("Cb", 1, "perfect"));
      expect(chord.bassNote).toMatchObject(n("E#", 3, "doubly augmented"));
      expect(chord.tones).toMatchObject([n("Cb", 1, "perfect"), n("Eb", 3, "major"), n("Gb", 5, "perfect")]);
    });

    test("C/Bb", () => {
      const chord = new Chord("C/Bb");
      expect(chord.quality).toBe("major");
      expect(chord.rootNote).toMatchObject(n("C", 1, "perfect"));
      expect(chord.bassNote).toMatchObject(n("Bb", 7, "minor"));
    });

    test("C/Cbb", () => {
      const chord = new Chord("C/Cbb");
      expect(chord.quality).toBe("major");
      expect(chord.rootNote).toMatchObject(n("C", 1, "perfect"));
      expect(chord.bassNote).toMatchObject(n("Cbb", 8, "doubly diminished"));
    });

    test("C#/Ebb", () => {
      const chord = new Chord("C#/Ebb");
      expect(chord.quality).toBe("major");
      expect(chord.rootNote).toMatchObject(n("C#", 1, "perfect"));
      expect(chord.bassNote).toMatchObject(n("Ebb", 3, "doubly diminished"));
    });

    test("C/Cb", () => {
      const chord = new Chord("C/Cb");
      expect(chord.quality).toBe("major");
      expect(chord.rootNote).toMatchObject(n("C", 1, "perfect"));
      expect(chord.bassNote).toMatchObject(n("Cb", 8, "diminished"));
    });

    test("D/C", () => {
      const chord = new Chord("D/C");
      expect(chord.quality).toBe("major");
      expect(chord.rootNote).toMatchObject(n("D", 1, "perfect"));
      expect(chord.bassNote).toMatchObject(n("C", 7, "minor"));
    });

    test("C/B#", () => {
      const chord = new Chord("C/B#");
      expect(chord.quality).toBe("major");
      expect(chord.rootNote).toMatchObject(n("C", 1, "perfect"));
      expect(chord.bassNote).toMatchObject(n("B#", 7, "augmented"));
    });

    test("C/E", () => {
      const chord = new Chord("C/E");
      expect(chord.quality).toBe("major");
      expect(chord.rootNote).toMatchObject(n("C", 1, "perfect"));
      expect(chord.bassNote).toMatchObject(n("E", 3, "major"));
    });

    test("C/D", () => {
      const chord = new Chord("C/D");
      expect(chord.quality).toBe("major");
      expect(chord.rootNote).toMatchObject(n("C", 1, "perfect"));
      expect(chord.bassNote).toMatchObject(n("D", 2, "major"));
    });

    test("C/G", () => {
      const chord = new Chord("C/G");
      expect(chord.quality).toBe("major");
      expect(chord.rootNote).toMatchObject(n("C", 1, "perfect"));
      expect(chord.bassNote).toMatchObject(n("G", 5, "perfect"));
    });

    test("C/Bb", () => {
      const chord = new Chord("C/Bb");
      expect(chord.quality).toBe("major");
      expect(chord.rootNote).toMatchObject(n("C", 1, "perfect"));
      expect(chord.bassNote).toMatchObject(n("Bb", 7, "minor"));
    });

    test("B/Bb", () => {
      const chord = new Chord("B/Bb");
      expect(chord.quality).toBe("major");
      expect(chord.rootNote).toMatchObject(n("B", 1, "perfect"));
      expect(chord.bassNote).toMatchObject(n("Bb", 8, "diminished"));
    });

    test("C/F#", () => {
      const chord = new Chord("C/F#");
      expect(chord.quality).toBe("major");
      expect(chord.rootNote).toMatchObject(n("C", 1, "perfect"));
      expect(chord.bassNote).toMatchObject(n("F#", 4, "augmented"));
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

    test("C#/Eb", () => {
      const chord = new Chord("C#/Eb");
      expect(chord.quality).toBe("major");
      expect(chord.rootNote).toMatchObject(n("C#", 1, "perfect"));
      expect(chord.bassNote).toMatchObject(n("Eb", 3, "diminished"));
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
      expect(chord.rootNote).toMatchObject(n("C", 1, "perfect"));
      expect(chord.bassNote).toMatchObject(n("C", 1, "perfect"));
      expect(chord.tones).toMatchObject([n("C", 1, "perfect"), n("Eb", 3, "minor"), n("G", 5, "perfect")]);
      expect(chord.scale).toEqual([
        {
          degree: 1,
          intervalFromRoot: { quality: 'perfect', number: 1 },
          pitchClass: 0,
          role: "root",
          spelledNote: "C",
          tone: true,
        },
        {
          degree: 2,
          intervalFromRoot: { quality: 'major', number: 2 },
          pitchClass: 2,
          role: "second",
          spelledNote: "D",
          tone: false,
        },
        {
          degree: 3,
          intervalFromRoot: { quality: 'minor', number: 3 },
          pitchClass: 3,
          role: "third",
          spelledNote: "Eb",
          tone: true,
        },
        {
          degree: 4,
          intervalFromRoot: { quality: 'perfect', number: 4 },
          pitchClass: 5,
          role: "fourth",
          spelledNote: "F",
          tone: false,
        },
        {
          degree: 5,
          intervalFromRoot: { quality: 'perfect', number: 5 },
          pitchClass: 7,
          role: "fifth",
          spelledNote: "G",
          tone: true,
        },
        {
          degree: 6,
          intervalFromRoot: { quality: 'minor', number: 6 },
          pitchClass: 8,
          role: "sixth",
          spelledNote: "Ab",
          tone: false,
        },
        {
          degree: 7,
          intervalFromRoot: { quality: 'minor', number: 7 },
          pitchClass: 10,
          role: "seventh",
          spelledNote: "Bb",
          tone: false,
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

    test("Am/G#", () => {
      const chord = new Chord("Am/G#");
      expect(chord.quality).toBe("minor");
      expect(chord.rootNote).toMatchObject(n("A", 1, "perfect"));
      expect(chord.bassNote).toMatchObject(n("G#", 7, "major"));
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

  describe("Inversion", () => {
    test("Root position", () => {
      const chord = new Chord("C");
      expect(chord.inversion).toBeUndefined();
    });

    test("Not an inversion", () => {
      const chord = new Chord("C/Fb");
      expect(chord.inversion).toBeUndefined();
    });

    test("First inversion", () => {
      const chord = new Chord("C/E");
      expect(chord.inversion).toMatchObject({ degree: 1 });
    });

    test("Second inversion", () => {
      const chord = new Chord("C/G");
      expect(chord.inversion).toMatchObject({ degree: 2 });
    });
  });

  describe("Extensions", () => {
    test("C7", () => {
      const chord = new Chord("C7")
      expect(chord.rootNote).toMatchObject(n("C", 1, "perfect"))
      expect(chord.bassNote).toMatchObject(n("C", 1, "perfect"))
      expect(chord.tones).toMatchObject([
        n("C", 1, "perfect"),
        n("E", 3, "major"),
        n("G", 5, "perfect"),
        n("Bb", 7, "minor")
      ]);
    });

    test("C9", () => {
      const chord = new Chord("C9")
      expect(chord.rootNote).toMatchObject(n("C", 1, "perfect"))
      expect(chord.bassNote).toMatchObject(n("C", 1, "perfect"))
      expect(chord.tones).toMatchObject([
        n("C", 1, "perfect"),
        n("E", 3, "major"),
        n("G", 5, "perfect"),
        n("Bb", 7, "minor"),
        n("D", 9, "major")
      ]);
    });

    test("C11", () => {
      const chord = new Chord("C11")
      expect(chord.rootNote).toMatchObject(n("C", 1, "perfect"))
      expect(chord.bassNote).toMatchObject(n("C", 1, "perfect"))
      expect(chord.tones).toMatchObject([
        n("C", 1, "perfect"),
        n("E", 3, "major"),
        n("G", 5, "perfect"),
        n("Bb", 7, "minor"),
        n("D", 9, "major"),
        n("F", 11, "perfect"),
      ]);
    });

    test("C13", () => {
      const chord = new Chord("C13")
      expect(chord.rootNote).toMatchObject(n("C", 1, "perfect"))
      expect(chord.bassNote).toMatchObject(n("C", 1, "perfect"))
      expect(chord.tones).toMatchObject([
        n("C", 1, "perfect"),
        n("E", 3, "major"),
        n("G", 5, "perfect"),
        n("Bb", 7, "minor"),
        n("D", 9, "major"),
        n("F", 11, "perfect"),
        n("A", 13, "major"),
      ]);
    });

    test("Cmaj7", () => {
      const chord = new Chord("Cmaj7")
      expect(chord.rootNote).toMatchObject(n("C", 1, "perfect"))
      expect(chord.bassNote).toMatchObject(n("C", 1, "perfect"))
      expect(chord.tones).toMatchObject([
        n("C", 1, "perfect"),
        n("E", 3, "major"),
        n("G", 5, "perfect"),
        n("B", 7, "major"),
      ]);
    });

     test("Cm(maj7)/E", () => {
      const chord = new Chord("Cm(maj7)/E")
      expect(chord.rootNote).toMatchObject(n("C", 1, "perfect"))
      expect(chord.bassNote).toMatchObject(n("E", 3, "major"))
      expect(chord.tones).toMatchObject([
        n("C", 1, "perfect"),
        n("Eb", 3, "minor"),
        n("G", 5, "perfect"),
        n("B", 7, "major"),
      ]);
    });

    test("F#7", () => {
      const chord = new Chord("F#7")
      expect(chord.rootNote).toMatchObject(n("F#", 1, "perfect"))
      expect(chord.bassNote).toMatchObject(n("F#", 1, "perfect"))
      expect(chord.tones).toMatchObject([
        n("F#", 1, "perfect"),
        n("A#", 3, "major"),
        n("C#", 5, "perfect"),
        n("E", 7, "minor"),
      ]);
    });

    test("Dbmaj9", () => {
      const chord = new Chord("Dbmaj9")
      expect(chord.rootNote).toMatchObject(n("Db", 1, "perfect"))
      expect(chord.bassNote).toMatchObject(n("Db", 1, "perfect"))
      expect(chord.tones).toMatchObject([
        n("Db", 1, "perfect"),
        n("F", 3, "major"),
        n("Ab", 5, "perfect"),
        n("C", 7, "major"),
        n("Eb", 9, "major"),
      ]);
    });

    test("B9", () => {
      const chord = new Chord("B9")
      expect(chord.rootNote).toMatchObject(n("B", 1, "perfect"))
      expect(chord.bassNote).toMatchObject(n("B", 1, "perfect"))
      expect(chord.tones).toMatchObject([
        n("B", 1, "perfect"),
        n("D#", 3, "major"),
        n("F#", 5, "perfect"),
        n("A", 7, "minor"),
        n("C#", 9, "major"),
      ]);
    });
  });
})

