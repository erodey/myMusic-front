import React, { useState } from 'react'
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

  const regex = /^[0-5]?\d:[0-5]\d$/
  const [songCount, setSongCount] = useState(1)
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

  const collectData = () => {
    let data = [...songs]
    data.map((song) => {
      const parts = song.durationInput.split(":")
      const seconds = +parts.pop()
      const minutes = +parts.pop()
      const finalDuration = 60*minutes + seconds
      song.durationInput = finalDuration
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    collectData()

    // setInputs({
    //   ...inputs,
    //   songs: inputSongs
    // })
    // axios.post(`/album/addAlbum`, inputs)
    // .then(res => {
    //     console.log('rated album', res.data)
    //   })
    // .catch(err => console.log('error: ', err.response))
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
          >Save</button>
        </form> 
      </div>  
    </div>
  )
}

export default AddAlbumPage 
