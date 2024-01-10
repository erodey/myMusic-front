import React, { useEffect, useState } from 'react'
import '../../styles/SongRatingEntry.css'

const SongRatingEntry = ({index, songName, songDuration, inputs, setInputs, rerate, defaultValue}) => {

  const [songRating, setRating] = useState(0)
  const [isRerate, setIsRerate] = useState(rerate)
  const [focused, setFocused] = useState(false)
  const [inputValue, setInputValue] = useState(defaultValue)

  const localSetInputs = () => {
    if(!isRerate) {
      setInputs([
          ...inputs,
          {
            songName,
            songRating
          }
      ])
    } else {
      const nextInputs = inputs.map((input, i) => {
        if(i == index) return {songName, songRating}
        else return input
      })
      setInputs(nextInputs)
    }
  }


  return (
    <div className='song-entry-main'>
      <div>
        <p>{songName}</p>
        <p>{songDuration}</p>
      </div>
      <div className='song-entry-sub'>
        <label htmlFor="songRating">Rating (0-10) :</label>
        <input 
          type="text" 
          // min="0"
          // max="10"
          pattern='^[0-9]|10'
          name="songRating"
          onChange={(e) => {
            setInputValue(e.target.value)
            if(focused) setRating(e.target.value)
            else setRating(defaultValue)
          }}
          onBlur={(e) => {
            localSetInputs()
          }}
          onFocus={() => {
            setFocused(true)
            setInputValue('')
          }}
          value={inputValue}
          required
        />
      </div>
    </div>
  )
}

export default SongRatingEntry  
