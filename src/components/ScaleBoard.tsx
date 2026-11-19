import type { Chord, RelativeNote } from "../theory";
import './ScaleBoard.css'

interface ScaleBoardProps {
  chord?: Chord
}

export function ScaleBoard({ chord }: ScaleBoardProps) {
  return (
    <>
      <ol className="scale-board">
        <li>Chord: <b>{chord?.chordSymbol}</b></li>
        <li className={getChordRootChordClasses(chord)}>Root: <b>{chord?.rootNote?.spelledNote}</b></li>
        <li className={getBassChordClasses(chord)}>
          Bass: <b>{chord?.bassNote?.spelledNote}</b>
          {getBassExplanation(chord)}
        </li>
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
          <li key={index} className={getTonesClasses(note, chord)}>{getIntervalStr(note)}</li>
        ))}
      </ol>
    </>
  );
}

function convertIntervalDegree(n: number) {
  if (n == 1) {
    return "unison";
  }

  return convertDegree(n);
}

function convertDegree(n: number) {
  const rules = new Intl.PluralRules();
  switch (rules.select(n)) {
    case 'one':
      return "1st";
    case 'two':
      return "2nd";
    case 'few':
      return "3rd";
    case 'other':
      return `${n}th`;
  }
}

const isBassRoot = (chord?: Chord) => {
    return chord && chord?.rootNote === chord?.bassNote
  }

  const getChordRootChordClasses = (chord?: Chord) => {
    if (!chord) return '';

    const className = ['tone', 'root'];
    if (isBassRoot(chord)) {
      className.push('bass');
    }
    return className.join(' ');
  }

  const getBassChordClasses = (chord?: Chord) => {
    if (!chord) return '';

    const className = ['bass'];
    if (isBassRoot(chord)) {
      className.push('root');
    }

    if (isBassTone(chord)) {
      className.push('tone');
    }

    return className.join(' ');
  }

  const isBassTone = (chord?: Chord) => {
    return chord?.getTones().some(tone => tone.spelledNote === chord.bassNote.spelledNote);
  }

  const getIntervalStr = (note: RelativeNote) => {
    return `${note.intervalFromRoot.quality} ${convertIntervalDegree(note.intervalFromRoot.number)}`;
  }

  const getBassExplanation = (chord?: Chord) => {
    if (!chord || isBassRoot(chord)) return null;

    if (!isBassTone(chord)) {
      return (
        <span className="explanation">({getIntervalStr(chord.bassNote)})</span>
      )
    }

    if (chord.inversion) {
      return (<span className="explanation">({convertDegree(chord.inversion.degree)} inversion)</span>)
    }
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