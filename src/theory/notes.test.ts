import { describe, it, expect } from "vitest";
import { getPitchClass } from "./notes";

describe("getPitchClass", () => {
  it("C", () => expect(getPitchClass("C")).toStrictEqual({letterIndex: 0, pitchClass: 0}));
  it("C#", () => expect(getPitchClass("C#")).toStrictEqual({letterIndex: 0, pitchClass: 1}));
  it("D", () => expect(getPitchClass("D")).toStrictEqual({letterIndex: 1, pitchClass: 2}));
  it("D#", () => expect(getPitchClass("D#")).toStrictEqual({letterIndex: 1, pitchClass: 3}));
  it("E", () => expect(getPitchClass("E")).toStrictEqual({letterIndex: 2, pitchClass: 4}));
  it("F", () => expect(getPitchClass("F")).toStrictEqual({letterIndex: 3, pitchClass: 5}));
  it("F#", () => expect(getPitchClass("F#")).toStrictEqual({letterIndex: 3, pitchClass: 6}));
  it("G", () => expect(getPitchClass("G")).toStrictEqual({letterIndex: 4, pitchClass: 7}));
  it("G#", () => expect(getPitchClass("G#")).toStrictEqual({letterIndex: 4, pitchClass: 8}));
  it("A", () => expect(getPitchClass("A")).toStrictEqual({letterIndex: 5, pitchClass: 9}));
  it("A#", () => expect(getPitchClass("A#")).toStrictEqual({letterIndex: 5, pitchClass: 10}));
  it("Bbb", () => expect(getPitchClass("Bbb")).toStrictEqual({letterIndex: 6, pitchClass: 9}));
  it("B", () => expect(getPitchClass("B")).toStrictEqual({letterIndex: 6, pitchClass: 11}));
  it("Cb", () => expect(getPitchClass("Cb")).toStrictEqual({letterIndex: 0, pitchClass: 11}));
});
