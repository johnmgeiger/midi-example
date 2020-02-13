import React from 'react'
import './Controller.scss'


const Controller = props => {

    return (
        <div className="controller">
            <span   className="controller__play-stop"
                    onClick={props.onPlayToggle}>
                {
                    props.isPlaying ?
                    "Stop" :
                    "Play"
                }
            </span>
        </div>
    )
}

export default Controller