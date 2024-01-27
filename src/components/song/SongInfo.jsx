import React from 'react'
import { useState, useEffect } from 'react' 

function SongInfo({position, index, song}) {
  const [songInfo, setSong] = useState({})

  useEffect(() => {
    setSong(song)
  }, [])

  const convertDuration = (duration) => {
    let minutes = duration/60 | 0
    let seconds = duration%60
    if(seconds < 10) {
      seconds = seconds.toString()
      seconds = "0".concat(seconds)
    }
    minutes = minutes.toString()

    let finalDuration = minutes.concat(":", seconds)
    return finalDuration
  }

  return (
    <tr>
      <td>{position}</td>
      <td>{songInfo?.songName}</td>
      <td
        style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      ><span></span><p>{convertDuration(songInfo?.songDurationInSeconds)}</p></td>
    </tr>
  )
}

export default SongInfo 
