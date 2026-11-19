import { describe, it, expect } from "vitest";
import { FretBoard } from "./fret_board";
import { getPitchClass } from "./notes";
import Chord from "./chord";

const pos = (note: string, roles: string[], ) => ({pitchClass: getPitchClass(note).pitchClass, roles, spelledNote: roles.length > 0 ? note : undefined});
const empty = (note: string) => pos(note, []);
const tone = (note: string) => pos(note, ["tone"]);
const root = (note: string) => pos(note, ["root", "tone"]);
const rootBass = (note: string) => pos(note, ["bass", "root", "tone",]);
const toneBass = (note: string) => pos(note, ["bass", "tone"]);
const onlyBass = (note: string) => pos(note, ["bass"]);

describe("FretBoard", () => {
  it("should build a standard tuning board correctly", () => {
    const board = new FretBoard({});

    expect(board.board).toStrictEqual([
      [empty("G"),     empty("F#"),    empty("F"),     empty("E"),     empty("D#"),    empty("D"),     empty("C#"),    empty("C"),     empty("B"),     empty("A#"),    empty("A"),     empty("G#"),    empty("G"),     empty("F#"),    empty("F"),     empty("E")],
      [empty("C"),     empty("B"),     empty("A#"),    empty("A"),     empty("G#"),    empty("G"),     empty("F#"),    empty("F"),     empty("E"),     empty("D#"),    empty("D"),     empty("C#"),    empty("C"),     empty("B"),     empty("A#"),    empty("A")],
      [empty("F"),     empty("E"),     empty("D#"),    empty("D"),     empty("C#"),    empty("C"),     empty("B"),     empty("A#"),    empty("A"),     empty("G#"),    empty("G"),     empty("F#"),    empty("F"),     empty("E"),     empty("D#"),    empty("D")],
      [empty("A#"),    empty("A"),     empty("G#"),    empty("G"),     empty("F#"),    empty("F"),     empty("E"),     empty("D#"),    empty("D"),     empty("C#"),    empty("C"),     empty("B"),     empty("A#"),    empty("A"),     empty("G#"),    empty("G")],
      [empty("D"),     empty("C#"),    empty("C"),     empty("B"),     empty("A#"),    empty("A"),     empty("G#"),    empty("G"),     empty("F#"),    empty("F"),     empty("E"),     empty("D#"),    empty("D"),     empty("C#"),    empty("C"),     empty("B")],
      [empty("G"),     empty("F#"),    empty("F"),     empty("E"),     empty("D#"),    empty("D"),     empty("C#"),    empty("C"),     empty("B"),     empty("A#"),    empty("A"),     empty("G#"),    empty("G"),     empty("F#"),    empty("F"),     empty("E")],
    ]);
    expect(board.board[0].length).toBe(16);
  });

  it("should build a drop D tuning board correctly", () => {
    const board = new FretBoard({tuning: ["D", "A", "D", "G", "B", "E"]});

    expect(board.board).toStrictEqual([
      [empty("F"),     empty("E"),     empty("D#"),    empty("D"),     empty("C#"),    empty("C"),     empty("B"),     empty("A#"),    empty("A"),     empty("G#"),    empty("G"),     empty("F#"),    empty("F"),     empty("E"),     empty("D#"),    empty("D")],
      [empty("C"),     empty("B"),     empty("A#"),    empty("A"),     empty("G#"),    empty("G"),     empty("F#"),    empty("F"),     empty("E"),     empty("D#"),    empty("D"),     empty("C#"),    empty("C"),     empty("B"),     empty("A#"),    empty("A")],
      [empty("F"),     empty("E"),     empty("D#"),    empty("D"),     empty("C#"),    empty("C"),     empty("B"),     empty("A#"),    empty("A"),     empty("G#"),    empty("G"),     empty("F#"),    empty("F"),     empty("E"),     empty("D#"),    empty("D")],
      [empty("A#"),    empty("A"),     empty("G#"),    empty("G"),     empty("F#"),    empty("F"),     empty("E"),     empty("D#"),    empty("D"),     empty("C#"),    empty("C"),     empty("B"),     empty("A#"),    empty("A"),     empty("G#"),    empty("G")],
      [empty("D"),     empty("C#"),    empty("C"),     empty("B"),     empty("A#"),    empty("A"),     empty("G#"),    empty("G"),     empty("F#"),    empty("F"),     empty("E"),     empty("D#"),    empty("D"),     empty("C#"),    empty("C"),     empty("B")],
      [empty("G"),     empty("F#"),    empty("F"),     empty("E"),     empty("D#"),    empty("D"),     empty("C#"),    empty("C"),     empty("B"),     empty("A#"),    empty("A"),     empty("G#"),    empty("G"),     empty("F#"),    empty("F"),     empty("E")],
    ]);
    expect(board.board[0].length).toBe(16);
  });

  it("Should break on a bad tunning", () => {
    expect(() => new FretBoard({tuning: ["C", "D", "E", "F", "G", "H"]})).toThrow();
  });

  it("match notes C", () => {
    const board = new FretBoard({chord: new Chord("C")});

    expect(board.board).toStrictEqual([
      [tone("G"),      empty("F#"),    empty("F"),     tone("E"),      empty("D#"),    empty("D"),     empty("C#"),    rootBass("C"),  empty("B"),     empty("A#"),    empty("A"),     empty("G#"),    tone("G"),      empty("F#"),    empty("F"),     tone("E")],
      [rootBass("C"),  empty("B"),     empty("A#"),    empty("A"),     empty("G#"),    tone("G"),      empty("F#"),    empty("F"),     tone("E"),      empty("D#"),    empty("D"),     empty("C#"),    rootBass("C"),  empty("B"),     empty("A#"),    empty("A")],
      [empty("F"),     tone("E"),      empty("D#"),    empty("D"),     empty("C#"),    rootBass("C"),  empty("B"),     empty("A#"),    empty("A"),     empty("G#"),    tone("G"),      empty("F#"),    empty("F"),     tone("E"),      empty("D#"),    empty("D")],
      [empty("A#"),    empty("A"),     empty("G#"),    tone("G"),      empty("F#"),    empty("F"),     tone("E"),      empty("D#"),    empty("D"),     empty("C#"),    rootBass("C"),  empty("B"),     empty("A#"),    empty("A"),     empty("G#"),    tone("G")],
      [empty("D"),     empty("C#"),    rootBass("C"),  empty("B"),     empty("A#"),    empty("A"),     empty("G#"),    tone("G"),      empty("F#"),    empty("F"),     tone("E"),      empty("D#"),    empty("D"),     empty("C#"),    rootBass("C"),  empty("B")],
      [tone("G"),      empty("F#"),    empty("F"),     tone("E"),      empty("D#"),    empty("D"),     empty("C#"),    rootBass("C"),  empty("B"),     empty("A#"),    empty("A"),     empty("G#"),    tone("G"),      empty("F#"),    empty("F"),     tone("E")],
    ]);
  });

  it("match notes C/Bb", () => {
    const board = new FretBoard({chord: new Chord("C/Bb")});

    expect(board.board).toStrictEqual([
      [tone("G"),      empty("F#"),    empty("F"),     tone("E"),      empty("D#"),    empty("D"),     empty("C#"),    root("C"),      empty("B"),     onlyBass("Bb"), empty("A"),     empty("G#"),    tone("G"),      empty("F#"),    empty("F"),     tone("E")],
      [root("C"),      empty("B"),     onlyBass("Bb"), empty("A"),     empty("G#"),    tone("G"),      empty("F#"),    empty("F"),     tone("E"),      empty("D#"),    empty("D"),     empty("C#"),    root("C"),      empty("B"),     onlyBass("Bb"), empty("A")],
      [empty("F"),     tone("E"),      empty("D#"),    empty("D"),     empty("C#"),    root("C"),      empty("B"),     onlyBass("Bb"), empty("A"),     empty("G#"),    tone("G"),      empty("F#"),    empty("F"),     tone("E"),      empty("D#"),    empty("D")],
      [onlyBass("Bb"), empty("A"),     empty("G#"),    tone("G"),      empty("F#"),    empty("F"),     tone("E"),      empty("D#"),    empty("D"),     empty("C#"),    root("C"),      empty("B"),     onlyBass("Bb"), empty("A"),     empty("G#"),    tone("G")],
      [empty("D"),     empty("C#"),    root("C"),      empty("B"),     onlyBass("Bb"), empty("A"),     empty("G#"),    tone("G"),      empty("F#"),    empty("F"),     tone("E"),      empty("D#"),    empty("D"),     empty("C#"),    root("C"),      empty("B")],
      [tone("G"),      empty("F#"),    empty("F"),     tone("E"),      empty("D#"),    empty("D"),     empty("C#"),    root("C"),      empty("B"),     onlyBass("Bb"), empty("A"),     empty("G#"),    tone("G"),      empty("F#"),    empty("F"),     tone("E")],
    ]);
  });

   it("match notes C/E", () => {
    const board = new FretBoard({chord: new Chord("C/E")});

    expect(board.board).toStrictEqual([
      [tone("G"),      empty("F#"),    empty("F"),     toneBass("E"),  empty("D#"),    empty("D"),     empty("C#"),    root("C"),      empty("B"),     empty("A#"),    empty("A"),     empty("G#"),    tone("G"),      empty("F#"),    empty("F"),     toneBass("E")],
      [root("C"),      empty("B"),     empty("A#"),    empty("A"),     empty("G#"),    tone("G"),      empty("F#"),    empty("F"),     toneBass("E"),  empty("D#"),    empty("D"),     empty("C#"),    root("C"),      empty("B"),     empty("A#"),    empty("A")],
      [empty("F"),     toneBass("E"),  empty("D#"),    empty("D"),     empty("C#"),    root("C"),      empty("B"),     empty("A#"),    empty("A"),     empty("G#"),    tone("G"),      empty("F#"),    empty("F"),     toneBass("E"),  empty("D#"),    empty("D")],
      [empty("A#"),    empty("A"),     empty("G#"),    tone("G"),      empty("F#"),    empty("F"),     toneBass("E"),  empty("D#"),    empty("D"),     empty("C#"),    root("C"),      empty("B"),     empty("A#"),    empty("A"),     empty("G#"),    tone("G")],
      [empty("D"),     empty("C#"),    root("C"),      empty("B"),     empty("A#"),    empty("A"),     empty("G#"),    tone("G"),      empty("F#"),    empty("F"),     toneBass("E"),  empty("D#"),    empty("D"),     empty("C#"),    root("C"),      empty("B")],
      [tone("G"),      empty("F#"),    empty("F"),     toneBass("E"),  empty("D#"),    empty("D"),     empty("C#"),    root("C"),      empty("B"),     empty("A#"),    empty("A"),     empty("G#"),    tone("G"),      empty("F#"),    empty("F"),     toneBass("E")],
    ]);
  });

  it("match notes Cb", () => {
    const board = new FretBoard({chord: new Chord("Cb")});

    expect(board.board).toStrictEqual([
      [empty("G"),     tone("Gb"),     empty("F"),     empty("E"),     tone("Eb"),     empty("D"),     empty("C#"),    empty("C"),     rootBass("Cb"), empty("A#"),    empty("A"),     empty("G#"),    empty("G"),     tone("Gb"),     empty("F"),     empty("E")],
      [empty("C"),     rootBass("Cb"), empty("A#"),    empty("A"),     empty("G#"),    empty("G"),     tone("Gb"),     empty("F"),     empty("E"),     tone("Eb"),     empty("D"),     empty("C#"),    empty("C"),     rootBass("Cb"), empty("A#"),    empty("A")],
      [empty("F"),     empty("E"),     tone("Eb"),     empty("D"),     empty("C#"),    empty("C"),     rootBass("Cb"), empty("A#"),    empty("A"),     empty("G#"),    empty("G"),     tone("Gb"),     empty("F"),     empty("E"),     tone("Eb"),     empty("D")],
      [empty("A#"),    empty("A"),     empty("G#"),    empty("G"),     tone("Gb"),     empty("F"),     empty("E"),     tone("Eb"),     empty("D"),     empty("C#"),    empty("C"),     rootBass("Cb"), empty("A#"),    empty("A"),     empty("G#"),    empty("G")],
      [empty("D"),     empty("C#"),    empty("C"),     rootBass("Cb"), empty("A#"),    empty("A"),     empty("G#"),    empty("G"),     tone("Gb"),     empty("F"),     empty("E"),     tone("Eb"),     empty("D"),     empty("C#"),    empty("C"),     rootBass("Cb")],
      [empty("G"),     tone("Gb"),     empty("F"),     empty("E"),     tone("Eb"),     empty("D"),     empty("C#"),    empty("C"),     rootBass("Cb"), empty("A#"),    empty("A"),     empty("G#"),    empty("G"),     tone("Gb"),     empty("F"),     empty("E")],
    ]);
  });
});