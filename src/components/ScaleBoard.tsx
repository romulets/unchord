import type { Chord } from "../theory";
import './ScaleBoard.css'

interface ScaleBoardProps {
  chord?: Chord
}

export function ScaleBoard({ chord }: ScaleBoardProps) {

  return (
  <>
      <p>Chord: {chord?.chordSymbol}</p>
        <ol className="scale-board">
          <li>Scale:</li>
          {chord?.scale.map((note, index) => (
            <li key={index} className={chord?.toneDegrees.includes(note.degree) ? "chord-note" : ""}>{note.spelledNote}</li>
          ))}
        </ol>
        <ol className="scale-board">
          <li>Role:</li>
          {chord?.scale.map((note, index) => (
            <li key={index} className={chord?.toneDegrees.includes(note.degree) ? "chord-note" : ""}>{note.role}</li>
          ))}
        </ol>
        <ol className="scale-board">
          <li>Intervals:</li>
          {chord?.scale.map((note, index) => (
            <li key={index} className={chord?.toneDegrees.includes(note.degree) ? "chord-note" : ""}>{convertDegree(note.degree)} {note.intervalFromRoot.quality}</li>
          ))}
        </ol>
        </>
  );
}

function convertDegree(n: number) {
  if (n < 1 || n > 12) {
    throw new Error(`We don't support ${n} as ordinal`);
  }
  switch (n) {
    case 1:
      return "unison";
    case 2:
      return "2nd";
    case 3:
      return "3rd";
    case 8:
      return "octave";
    default:
      return `${n}th`;
  }
}