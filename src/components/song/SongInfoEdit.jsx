import React from 'react'
import { useState, useEffect } from 'react' 

function SongInfoEdit({index, song, songsToChange, setSongsToChange, position}) {
  const [songInfo, setSongInfo] = useState({})
  const [songName, setSongName] = useState('')
  const [songDuration, setSongDuration] = useState('00:00')
  const [songDurationInSeconds, setSongDurationInSeconds] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [songNameChanged, setSongNameChanged] = useState(false)
  const [songDurationChanged, setSongDurationChanged] = useState(false)

  useEffect(() => {
    setSongInfo(song)
    setSongName(song?.songName)
    setSongDuration(convertDuration(song.songDurationInSeconds))
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
    setIsLoaded(true)
    return finalDuration
  }

  const reconvertDuration = () => {
    let finalDuration = 0
    const parts = songDuration.split(":")
    const seconds = +parts.pop()
    const minutes = +parts.pop()
    finalDuration = 60*minutes + seconds
    setSongDurationInSeconds(finalDuration)
  }

  const collectData = () => {
    let data = [...songsToChange]
    if(songNameChanged && songDurationChanged){
      data[index].songName = songName
      data[index].songDuration = songDurationInSeconds
      data[index].code = 3
      setSongsToChange(data)
    } else if(songNameChanged && !songDurationChanged) {
      data[index].songName = songName
      data[index].code = 1
      setSongsToChange(data)
    } else if(!songNameChanged && songDurationChanged){
      data[index].songDuration = songDurationInSeconds
      data[index].code = 2
      setSongsToChange(data)
    }
  } 

  useEffect(() => {
    collectData()
  }, [songDurationInSeconds])

  return (
    <tr>
      <td>{position}</td>
      <td><input 
        type="text" 
        value={songName}
        onFocus={() => {
          if(!songNameChanged){
            setSongName('')
            setSongNameChanged(true)
          } else setSongNameChanged(true)
        }}
        onChange={(e) => setSongName(e.target.value)}
        onBlur={collectData}
      />
      </td>
      <td><input 
        type="text" 
        value={isLoaded ? songDuration : "00:00"}
        size="5"
        pattern='^[1-5]?[0-9]:[0-5][0-9]$'
        onFocus={() => {
          if(!songDurationChanged){
            setSongDuration('')
            setSongDurationChanged(true)
          } else setSongDurationChanged(true) 
        }}
        onChange={(e) => setSongDuration(e.target.value)}
        onBlur={() => {
          reconvertDuration()
        }}
      />
      </td>
    </tr>
  )
}

export default SongInfoEdit
