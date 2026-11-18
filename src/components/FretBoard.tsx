import { useState } from 'react';
import './FretBoard.css'
import { Chord, getBoard, STANDARD_TUNING, validateTuning } from '../theory';

const MAX_FRET_SIZE_PX = 70;
const FRET_SIZE_RATIO = 0.96;

interface FretBoardProps {
  chord?: Chord
}

export function FretBoard({ chord }: FretBoardProps) {
  const [actualTuning, setActualTuning] = useState(STANDARD_TUNING);
  const board = getBoard(actualTuning, chord);

  const [invalidTuningStrings, setInvalidTuning] = useState<number[]>([]);
  const [maskedTuning, setMaskedTuning] = useState<string[]>(actualTuning);

  const handleTuning = (stringIndex: number, value: string) => {
    const newTuning = [...actualTuning];
    newTuning[stringIndex] = value;
    setMaskedTuning(newTuning);

    const validation = validateTuning(newTuning);
    const invalidStrings = validation.map((value, index) => !value ? index : -1).filter(i => i !== -1);
    if (invalidStrings.length > 0) {
      setInvalidTuning(invalidStrings);
      return;
    }

    setInvalidTuning([]);
    setActualTuning(newTuning);
  };

  const openString = (i: number) => (board.board[i][board.board[i].length - 1]) 

  return (
    <div className="fret-board">
      {board.board.map((string, stringIndex) => (
        <ol key={stringIndex} className={['fret-string', invalidTuningStrings.includes(stringIndex) ? 'invalid' : ''].join(' ')}>
          {string.slice(0, string.length - 1).map((position, fretIndex) => (
            <li key={fretIndex} className="fret" style={{ width: `${MAX_FRET_SIZE_PX * (FRET_SIZE_RATIO ** (string.length - fretIndex))}px` }}>
              {position.note && <span className="note">{position.note}</span>}
            </li>
          ))}

          <li key={`open-string-${stringIndex}`} className="open-string">
            <input className={[openString(stringIndex).tone ? "chord" : ""].join(' ')} value={maskedTuning[stringIndex]} onChange={(e) => handleTuning(stringIndex, e.target.value)} />
          </li>
        </ol>
      ))}
    </div>
  );
}