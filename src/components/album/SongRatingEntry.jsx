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

  const [innerWidth, setInnerWidth] = useState(window.innerWidth)
  const breakpoint = 900
  const [width, setWidth] = useState()

  useEffect(() => {
    const handleResizeWindow = () => setInnerWidth(window.innerWidth)

    window.addEventListener("resize", handleResizeWindow)

    return () => {
      window.removeEventListener("resize", handleResizeWindow)
    }
  }, [])

  useEffect(() => {
    let temp = breakpoint > innerWidth ? breakpoint : innerWidth
    setWidth(temp)
  }, [innerWidth])



  return (
    <div className='song-entry-main'
    >
      <div
      >
        <p>{songName}</p>
        <p>{songDuration}</p>
      </div>
      <div className='song-entry-sub'>
        <label htmlFor="songRating">Rating (0-10) :</label>
        <input 
          type="text" 
          pattern='^[0-9]|10'
          size='2'
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
