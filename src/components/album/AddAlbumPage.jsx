import React, { useEffect, useState } from 'react'
import '../../styles/AddAlbumPage.css'
import AddAlbumHeader from './AddAlbumHeader'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareXmark, faPlus } from '@fortawesome/free-solid-svg-icons'
import '../../styles/AddAlbumEntry.css'
import { useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import NavBarWrapper from '../NavBarWrapper'

const AddAlbumPage = () => {

  const axiosPrivate = useAxiosPrivate()

  const {setAuth} = useAuth()

  const [inputs, setInputs] = useState({})
  const [ready, setReady] = useState()
  const [loading, setLoading] = useState(true)
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
  const navigate = useNavigate()
  const location = useLocation()


  useEffect(() => {
    const check = async () => {
      try {
        const response = await axiosPrivate.get("auth/check")
        console.log('response', response) 
        setLoading(false)
      } catch (error) {
        setAuth({})
        navigate('/login', {state: { from: location}, replace: true})
      } finally {
        setLoading(false)
      }
    }

    check()
  }, [])

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


  const post = () => {
    console.log('inputs', inputs)
    axiosPrivate.post(`/album/addAlbum`, inputs)
    .then(res => {
        console.log('added album', res.data)
      })
    .catch(err => console.log('error: ', err.response))
  }

  useEffect(() => {
    setInputs({
      ...headerInputs,
      songs: songsToSubmit
    })
  }, [headerInputs, songsToSubmit])


  const handleSubmit = (e) => {
    e.preventDefault()
    post()
    setSubmitButtonDisabled(true)
  }


  return (
    <div>
      <NavBarWrapper />
      {
        loading ? <></> : 
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
                    <>
                      <div className='centered-content-along-y' key={index}>
                        <div className='shadow centered-content-along-y' style={{marginTop: '1rem', padding: '0 0 1rem'}}>
                          <div className='x-mark-section'>
                            <div>
                              <span></span>
                            </div>
                            {
                              index != 0 ? <FontAwesomeIcon  
                                icon={faSquareXmark}
                                style={{
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
                          {
                            index == 0 ? <>
                            <div className='add-album-entry' style={{paddingTop: '1.4rem'}}>
                              <label>Song name</label>
                              <input 
                                type="text" 
                                name='nameInput'
                                value={song.nameInput}
                                onChange={e => handleNameChange(e, index)}
                                onBlur={collectSongs}
                                required
                                autoComplete='off'
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
                                  autoComplete='off'
                                  required
                                />
                            </div>  
                            </> : <>
                            <div className='add-album-entry'>
                              <label>Song name</label>
                              <input 
                                type="text" 
                                name='nameInput'
                                value={song.nameInput}
                                onChange={e => handleNameChange(e, index)}
                                onBlur={collectSongs}
                                required
                                autoComplete='off'
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
                                  autoComplete='off'
                                  required
                                />
                            </div>  
                            </>
                          }
                        </div>
                      </div>
                      {
                        index == 0 && songs.length > 1 ? <div style={{paddingLeft: '9.2rem', display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}> 
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
                          /> <p style={{marginTop: '1rem', marginLeft: '0.5rem'}}>Number of songs: {songs.length}</p> </div> : <></>
                      }
                    </>
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
              className='save-album-button button' 
              type="submit"
              // disabled={submitButtonDisabled}
            >Save</button>
          </form> 
        </div>  
      }
    </div>
  )
}

export default AddAlbumPage 
