import type { Chord } from "../theory";
import './ScaleBoard.css'

interface ScaleBoardProps {
  chord?: Chord
}

export function ScaleBoard({ chord }: ScaleBoardProps) {

  const getChordRootChordClasses = () => {
    if (!chord) return '';

    const className = ['tone', 'root'];
    if (chord.rootNote === chord.bassNote) {
      className.push('bass');
    }
    return className.join(' ');
  }

  const getBassChordClasses = () => {
    if (!chord) return '';

    const className = ['bass'];
    if (chord.rootNote === chord.bassNote) {
      className.push('tone', 'root');
    }
    return className.join(' ');
  }

  const getTonesClasses = (note: Chord['scale'][number], chord?: Chord) => {
    if (!chord) return '';

    const className = [];
    if (chord.toneDegrees.includes(note.degree)) {
      className.push('tone');

      if (chord.bassNote.pitchClass === note.pitchClass) {
        className.push('bass');
      }

      if (chord.rootNote.pitchClass === note.pitchClass) {
        className.push('root');
      }
    }
    return className.join(' ');
  }

  return (
    <>
      <ol className="scale-board">
        <li>Chord: <b>{chord?.chordSymbol}</b></li>
        <li className={getChordRootChordClasses()}>Root: <b>{chord?.rootNote?.spelledNote}</b></li>
        <li className={getBassChordClasses()}>Bass: <b>{chord?.bassNote?.spelledNote}</b></li>
      </ol>
      
      <ol className="scale-board">
        <li>Scale:</li>
        {chord?.scale.map((note, index) => (
          <li key={index} className={getTonesClasses(note, chord)}>{note.spelledNote}</li>
        ))}
      </ol>
      <ol className="scale-board">
        <li>Role:</li>
        {chord?.scale.map((note, index) => (
          <li key={index} className={getTonesClasses(note, chord)}>{note.role}</li>
        ))}
      </ol>
      <ol className="scale-board">
        <li>Intervals:</li>
        {chord?.scale.map((note, index) => (
          <li key={index} className={getTonesClasses(note, chord)}>{convertDegree(note.degree)} {note.intervalFromRoot.quality}</li>
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