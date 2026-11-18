import { describe, it, expect } from "vitest";
import { FretBoard } from "./fret_board";
import { getPitchClass } from "./notes";
import Chord from "./chord";


const f = (note: string) => ({pitchClass: getPitchClass(note).pitchClass, tone: false});
const p = (note: string) => ({pitchClass: getPitchClass(note).pitchClass, tone: true, note});

describe("FretBoard", () => {
  it("should build a standard tuning board correctly", () => {
    const board = new FretBoard({});

    expect(board.board).toStrictEqual([
      [f("G"),  f("F#"), f("F"),  f("E"), f("D#"), f("D"), f("C#"), f("C"),  f("B"),  f("A#"), f("A"), f("G#"), f("G"),  f("F#"), f("F"),  f("E")],
      [f("C"),  f("B"),  f("A#"), f("A"), f("G#"), f("G"), f("F#"), f("F"),  f("E"),  f("D#"), f("D"), f("C#"), f("C"),  f("B"),  f("A#"), f("A")],
      [f("F"),  f("E"),  f("D#"), f("D"), f("C#"), f("C"), f("B"),  f("A#"), f("A"),  f("G#"), f("G"), f("F#"), f("F"),  f("E"),  f("D#"), f("D")],
      [f("A#"), f("A"),  f("G#"), f("G"), f("F#"), f("F"), f("E"),  f("D#"), f("D"),  f("C#"), f("C"), f("B"),  f("A#"), f("A"),  f("G#"), f("G")],
      [f("D"),  f("C#"), f("C"),  f("B"), f("A#"), f("A"), f("G#"), f("G"),  f("F#"), f("F"),  f("E"), f("D#"), f("D"),  f("C#"), f("C"),  f("B")],
      [f("G"),  f("F#"), f("F"),  f("E"), f("D#"), f("D"), f("C#"), f("C"),  f("B"),  f("A#"), f("A"), f("G#"), f("G"),  f("F#"), f("F"),  f("E")],
    ]);
    expect(board.board[0].length).toBe(16);
  });

  it("should build a drop D tuning board correctly", () => {
    const board = new FretBoard({tuning: ["D", "A", "D", "G", "B", "E"]});

    expect(board.board).toStrictEqual([
      [f("F"),  f("E"),  f("D#"), f("D"), f("C#"), f("C"), f("B"),  f("A#"), f("A"),  f("G#"), f("G"), f("F#"), f("F"),  f("E"),  f("D#"), f("D")],
      [f("C"),  f("B"),  f("A#"), f("A"), f("G#"), f("G"), f("F#"), f("F"),  f("E"),  f("D#"), f("D"), f("C#"), f("C"),  f("B"),  f("A#"), f("A")],
      [f("F"),  f("E"),  f("D#"), f("D"), f("C#"), f("C"), f("B"),  f("A#"), f("A"),  f("G#"), f("G"), f("F#"), f("F"),  f("E"),  f("D#"), f("D")],
      [f("A#"), f("A"),  f("G#"), f("G"), f("F#"), f("F"), f("E"),  f("D#"), f("D"),  f("C#"), f("C"), f("B"),  f("A#"), f("A"),  f("G#"), f("G")],
      [f("D"),  f("C#"), f("C"),  f("B"), f("A#"), f("A"), f("G#"), f("G"),  f("F#"), f("F"),  f("E"), f("D#"), f("D"),  f("C#"), f("C"),  f("B")],
      [f("G"),  f("F#"), f("F"),  f("E"), f("D#"), f("D"), f("C#"), f("C"),  f("B"),  f("A#"), f("A"), f("G#"), f("G"),  f("F#"), f("F"),  f("E")],
    ]);
    expect(board.board[0].length).toBe(16);
  });

  it("Should break on a bad tunning", () => {
    expect(() => new FretBoard({tuning: ["C", "D", "E", "F", "G", "H"]})).toThrow();
  });

  it("match notes C", () => {
    const board = new FretBoard({chord: new Chord("C")});

    expect(board.board).toStrictEqual([
      [p("G"),  f("F#"), f("F"),  p("E"), f("D#"), f("D"), f("C#"), p("C"),  f("B"),  f("A#"), f("A"), f("G#"), p("G"),  f("F#"), f("F"),  p("E")],
      [p("C"),  f("B"),  f("A#"), f("A"), f("G#"), p("G"), f("F#"), f("F"),  p("E"),  f("D#"), f("D"), f("C#"), p("C"),  f("B"),  f("A#"), f("A")],
      [f("F"),  p("E"),  f("D#"), f("D"), f("C#"), p("C"), f("B"),  f("A#"), f("A"),  f("G#"), p("G"), f("F#"), f("F"),  p("E"),  f("D#"), f("D")],
      [f("A#"), f("A"),  f("G#"), p("G"), f("F#"), f("F"), p("E"),  f("D#"), f("D"),  f("C#"), p("C"), f("B"),  f("A#"), f("A"),  f("G#"), p("G")],
      [f("D"),  f("C#"), p("C"),  f("B"), f("A#"), f("A"), f("G#"), p("G"),  f("F#"), f("F"),  p("E"), f("D#"), f("D"),  f("C#"), p("C"),  f("B")],
      [p("G"),  f("F#"), f("F"),  p("E"), f("D#"), f("D"), f("C#"), p("C"),  f("B"),  f("A#"), f("A"), f("G#"), p("G"),  f("F#"), f("F"),  p("E")],
    ]);
  });

  it("match notes Cb", () => {
    const board = new FretBoard({chord: new Chord("Cb")});

    expect(board.board).toStrictEqual([
      [f("G"),  p("Gb"), f("F"),  f("E"),  p("Eb"), f("D"), f("C#"),  f("C"),  p("Cb"),  f("A#"), f("A"), f("G#"), f("G"),  p("Gb"), f("F"),  f("E")],
      [f("C"),  p("Cb"), f("A#"), f("A"),  f("G#"), f("G"), p("Gb"),  f("F"),  f("E"),   p("Eb"), f("D"), f("C#"), f("C"),  p("Cb"), f("A#"), f("A")],
      [f("F"),  f("E"),  p("Eb"), f("D"),  f("C#"), f("C"), p("Cb"),  f("A#"), f("A"),   f("G#"), f("G"), p("Gb"), f("F"),  f("E"),  p("Eb"), f("D")],
      [f("A#"), f("A"),  f("G#"), f("G"),  p("Gb"), f("F"), f("E"),   p("Eb"), f("D"),   f("C#"), f("C"), p("Cb"), f("A#"), f("A"),  f("G#"), f("G")],
      [f("D"),  f("C#"), f("C"),  p("Cb"), f("A#"), f("A"), f("G#"),  f("G"),  p("Gb"),  f("F"),  f("E"), p("Eb"), f("D"),  f("C#"), f("C"),  p("Cb")],
      [f("G"),  p("Gb"), f("F"),  f("E"),  p("Eb"), f("D"), f("C#"),  f("C"),  p("Cb"),   f("A#"), f("A"), f("G#"), f("G"),  p("Gb"), f("F"),  f("E")],
    ]);
  });
});