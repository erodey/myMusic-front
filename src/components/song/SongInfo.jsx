import React from 'react'
import { useState, useEffect } from 'react' 

function SongInfo({index, song}) {
  const [songInfo, setSong] = useState({})

  useEffect(() => {
    setSong(song)
  }, [])

  const convertDuration = (duration) => {
    let minutes = duration/60 | 0
    let seconds = duration%60
    minutes = minutes.toString()
    seconds = seconds.toString()
    let finalDuration = minutes.concat(":", seconds)
    return finalDuration
  }

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{songInfo?.songName}</td>
      <td>{convertDuration(songInfo?.songDurationInSeconds)}</td>
    </tr>
  )
}

export default SongInfo 
