import React, { useEffect, useState } from 'react'
import NavBar from '../NavBar'
import '../../styles/AddAlbumPage.css'
import AddAlbumHeader from './AddAlbumHeader'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import axios from '../../api/axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareXmark, faPlus } from '@fortawesome/free-solid-svg-icons'
import '../../styles/AddAlbumEntry.css'

const AddAlbumPage = () => {

  const axiosPrivate = useAxiosPrivate()

  const [inputs, setInputs] = useState({})
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false)
  const [songCount, setSongCount] = useState(1)
  const [songsToSubmit, setSongsToSubmit] = useState([])
  const [songs, setSongs] = useState([
    {
      songId: 0,
      nameInput: '',
      durationInput: ''
    }
  ])
  const [headerInputs, setHeaderInputs] = useState({})

  const handleAddSong = () => {
    setSongs([
      ...songs,
      {
        songId: songCount,
        nameInput: '',
        durationInput: ''
      }
    ])
    setSongCount(previousCount => previousCount + 1)
  }

  const handleNameChange = (e, i) => {
    let data = [...songs]
    data[i].nameInput = e.target.value
    setSongs(data)
  }

  const handleDurationChange = (e, i) => {
    let data = [...songs]
    data[i].durationInput = e.target.value
    setSongs(data)
  }

  const collectSongs = () => {
    let data = JSON.parse(JSON.stringify(songs))
    let songsToSubmitTemp = []
    data.map((song, index) => {
      const parts = song.durationInput.split(":")
      const seconds = +parts.pop()
      if(seconds < 10) {
        seconds = "0".concat(seconds)
      }
      const minutes = +parts.pop()
      const finalDuration = 60*minutes + seconds
      songsToSubmitTemp = [
        ...songsToSubmitTemp,
        {
          songName: song.nameInput,
          songDurationInSeconds: finalDuration,
          position: index + 1
        }
      ]
    })

    setSongsToSubmit(songsToSubmitTemp)
  }


  useEffect(() => {
    console.log('inputs', inputs)
    axios.post(`/album/addAlbum`, inputs)
    .then(res => {
        console.log('rated album', res.data)
      })
    .catch(err => console.log('error: ', err.response))
  }, [inputs])


  const handleSubmit = (e) => {
    e.preventDefault()
    setInputs({
      ...headerInputs,
      songs: songsToSubmit
    })
    setSubmitButtonDisabled(true)
  }


  return (
    <div>
      <NavBar />
      <div className="container add-album-page">
        <form 
          className='centered-content-along-y'
          onSubmit={handleSubmit}
        >
          <AddAlbumHeader 
            inputs={headerInputs}
            setInputs={setHeaderInputs}
          />
          {
            songs.map((song, index) => {
              return (
                <div className='centered-content-along-y' key={index}>
                  <div className='shadow centered-content-along-y' style={{position: 'relative', padding: '2rem', paddingBottom: '1rem', marginTop: '1rem'}}>
                    <div className='add-album-entry'>
                      <label>Song name</label>
                      <input 
                        type="text" 
                        name='nameInput'
                        value={song.nameInput}
                        onChange={e => handleNameChange(e, index)}
                        onBlur={collectSongs}
                        required
                      />
                    </div>
                    <div className='add-album-entry'>
                        <label>Song duration (mm:ss)</label>
                        <input 
                          type="text"
                          name='durationInput'
                          value={song.durationInput}
                          onChange={e => handleDurationChange(e, index)}
                          pattern='^[1-5]?[0-9]:[0-5][0-9]$'
                          onBlur={collectSongs}
                          required
                        />
                    </div>  
                    {
                      index != 0 ? <FontAwesomeIcon  
                        icon={faSquareXmark}
                        style={{
                          position: 'absolute',
                          right: '0',
                          top: '0',
                          color: 'red', 
                          fontSize: '1.6rem', 
                          cursor: 'pointer'
                        }} 
                        onClick={() => {
                          let data = [...songs]
                          data.splice(index, 1)
                          setSongs(data)
                        }} 
                      /> : <></>
                    }
                  </div>
                </div>
              )
            }) 
          }           
          <FontAwesomeIcon 
            icon={faPlus} 
            style={{
              marginTop: '2vh',
              color: 'white', 
              backgroundColor: 'green', 
              padding: '.3rem', 
              borderRadius: '.3rem', 
              fontSize: '1rem', 
              cursor: 'pointer'
            }} 
            onClick={handleAddSong}
          />
          <button 
            className='save-album-button' 
            type="submit"
            disabled={submitButtonDisabled}
          >Save</button>
        </form> 
      </div>  
    </div>
  )
}

export default AddAlbumPage 
