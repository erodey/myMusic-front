import React from 'react'
import { useState, useEffect } from 'react' 
import '../../styles/SongInfo.css'

function SongInfo(props) {
  const [song, setSong] = useState({})

  useEffect(() => {
    setSong(props.song)
  }, [props.song])

  return (
    <div className='song-info'>
      <p>
        Song name: {song?.songName} <br/>
        Duration in seconds : {song?.songDurationInSeconds} <br/>
      </p>
    </div>
  )
}

export default SongInfo 
