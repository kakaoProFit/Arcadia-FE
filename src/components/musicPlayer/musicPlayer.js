'use client'

import React, { useState } from "react";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const MusicPlayer = (props) => { //props로 musicUrl을 받는다.
    return (
        <>
            <AudioPlayer
                autoPlay
                src={props.props}
                onPlay={e => console.log("onPlay")}
            />
        </>
    );

}

export default MusicPlayer;
