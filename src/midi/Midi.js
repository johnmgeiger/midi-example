import React from 'react'
import Tone from 'tone'

import './Midi.scss'


const Midi = props => {
    if (!props.noteBoard || !props.setNoteBoard)
        return <div className="midi" />

    return (
        <div className="midi">
            {
                props.noteBoard.map((noteRow, i) => (
                    <div    className="midi__row"
                            key={i}>
                        {
                            noteRow.map((cell, j) => {
                                const isName = typeof cell === "string"
                                
                                return (
                                    <div    className={`midi__cell ${
                                                !isName && cell ?
                                                'active' :
                                                ''
                                            } ${
                                                isName ?
                                                'name' :
                                                ''
                                            }`}
                                            onClick={() => {
                                                if (isName ) {
                                                    return
                                                }

                                                if (!props.noteBoard[i][j])
                                                    props.synth.triggerAttackRelease(props.noteBoard[i][0], "8n");

                                                props.setNoteBoard(currentBoard => {
                                                    const newBoard = [...currentBoard]
                                                    newBoard[i][j] = !newBoard[i][j]
                                                    return newBoard
                                                })                                                
                                            }}
                                            key={j}>
                                        {
                                            isName ?
                                            cell :
                                            null
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default Midi