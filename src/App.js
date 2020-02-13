import Controller from './controller/Controller'
import Midi from './midi/Midi'
import React, { useState } from 'react';
import Tone from 'tone'

import './App.scss';

function getEmptyMidi (notes, length) {
  const res = []
  for (let note of notes) {
    const newArr = []
    newArr.push(note)
        
    for (let i = 0; i < length; i++) {
      
      newArr.push(false)
    }    

    res.push(newArr)
  }

  return res
}

function App() {

  const [isPlaying, setIsPlaying] = useState(false)
  const [noteBoard, setNoteBoard] = useState(getEmptyMidi(["B4", "A4", "G4", "F4", "E4", "D4", "C4"], 16)) 

  // const instrument = new Tone.Instrument()
  const synth = new Tone.PolySynth(4, Tone.Synth).toMaster()

  // var music = [ { "time": 0, "note": "A4", "duration": "8n" },
  //               { "time": 0, "note": "C4", "duration": "8n" },
  //               { "time": 0.25, "note": "G4", "duration": "8n" }]
  console.log(Tone.Transport)

  function getMusicFromNoteBoard () {
    const musicSheet = []
    noteBoard.forEach(noteRow => {
      const note = noteRow[0]

      for (let i = 1; i < noteRow.length; i++) {
        if (noteRow[i]) {
          musicSheet.push({
            "time": (i / 4) - 0.25,
            note,
            duration: "8n",
          })
        }
      }
    })

    return musicSheet
  }


  function play () {
    const music = getMusicFromNoteBoard()
    new Tone.Part(function (time, note) {
      synth.triggerAttackRelease(note.note, note.duration, time);
    }, music).start(0)
    
    

    Tone.Transport.start();
    
    
    setIsPlaying(true)
  }

  function stop () {
    Tone.Transport.stop()
    Tone.Transport.cancel()
    setIsPlaying(false)
  }
  
  return (
    <div className="app">
      <Midi noteBoard={noteBoard} setNoteBoard={setNoteBoard} isPlaying={isPlaying} synth={synth} />
        <Controller isPlaying={isPlaying} 
                    onPlayToggle={() => {
                      if (isPlaying)
                        stop()
                      else
                        play()
                    }} />
    </div>
  );
}

export default App;
