import { useState } from 'react'
import './App.css'
import { getChord, type Chord } from './theory';
import { ScaleBoard } from './components/ScaleBoard';
import { FretBoard } from './components/FretBoard';

function App() {
  const [chordInput, setChordInput] = useState<string>("");
  const [chord, setChord] = useState<Chord | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  
  const handleChordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const strChord =  e.target.value;
    setChordInput(strChord);
    
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
          <input type="text" placeholder="Enter chord" value={chordInput} onChange={(handleChordChange)} />
      </form>

      {error && <p className="error">{error}</p>}
      
      <ScaleBoard chord={chord} />
      <FretBoard chord={chord} />
    </> 
  )
}

export default App
