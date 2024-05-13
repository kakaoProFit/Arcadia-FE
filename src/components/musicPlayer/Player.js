'use client'

import React, { Suspense, useState, useEffect } from 'react'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'


const Player  = (props) => { //props로 musicUrl을 받는다.

  return (
    <>
      <AudioPlayer autoPlay src={props.props} />
    </>
  )
}

export default Player
