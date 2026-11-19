import { useState } from 'react'
import './App.css'
import { getChord, type Chord } from './theory';
import { ScaleBoard } from './components/ScaleBoard';
import { FretBoard } from './components/FretBoard';
import { ColorLegend } from './components/ColorLegend';

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
      const newChord = getChord(e.target.value);
      setChord(newChord);
      setError(undefined);
    } catch (err) {
      setError((err as Error).message);
    }
    
  };

  return (
    <>
      <h1>Unchord</h1>
      <form onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Enter chord" value={chordInput} onChange={(handleChordChange)} className="chord-input" />
          {error && <span className="error">{error}</span>}
      </form>
      
      <ScaleBoard chord={chord} />
      <FretBoard chord={chord} />
      <ColorLegend />
    </> 
  )
}

export default App
