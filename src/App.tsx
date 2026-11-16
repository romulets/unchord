import { useState } from 'react'
import './App.css'
import { getChord, type Chord } from './theory';

function App() {

  const [chord, setChord] = useState<Chord | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  
  const handleChordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const strChord =  e.target.value;
    
    if (!strChord || strChord.trim() === "") {
      setChord(undefined);
      setError(undefined);
      return;
    }

    try {
      setChord(getChord(e.target.value));
      setError(undefined);
    } catch (err) {
      setError((err as Error).message);
      setChord(undefined);
    }
    
  };

  return (
    <>
      <h1>Unchord</h1>
      <form>
          <input type="text" placeholder="Enter chord" value={chord?.toString()} onChange={(handleChordChange)} />
      </form>

      {error && <p className="error">{error}</p>}
      
      {chord && <>
        <p>Chord: {chord.toString()}</p>
        <div className="scale-table">
          <span>Scale:</span>
          {chord.majorScale.map((note, index) => (
            <span key={index} className={chord.getNotePositions().includes(index) ? "chord-note" : ""}>{note}</span>
          ))}
        </div>
        <div className="scale-table">
          <span>Composition:</span>
          {chord.majorScale.map((_, index) => (
            <span key={index} className={chord.getNotePositions().includes(index) ? "chord-note" : ""}>{chord.findDegreeByPosition(index)}</span>
          ))}
        </div>
        </> 
      }
    </> 
  )
}

export default App
