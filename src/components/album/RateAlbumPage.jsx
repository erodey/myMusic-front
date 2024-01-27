import React, { useEffect, useRef, useState } from 'react'
import SongRatingEntry from './SongRatingEntry'
import { useParams } from 'react-router-dom'
import '../../styles/RateAlbumPage.css'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import NavBarWrapper from '../NavBarWrapper'

const RateAlbumPage = () => {

  const axiosPrivate = useAxiosPrivate()
  const [album, setAlbum] = useState({})
  const [inputs, setInputs] = useState([])
  const {id} = useParams()
  const [loaded, setLoaded] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const {setAuth} = useAuth()

  useEffect(()=>{

    const getRatedAlbum = async () => {
      try {
        const response = await axiosPrivate.get(`/album/byId/${id}`)
        setAlbum(response.data)
        setLoaded(true)
      } catch (error) {
        console.log('error: ', error.response)
        setAuth({})
        navigate('/login', {state: { from: location}, replace: true})
      }
    }

    getRatedAlbum()

    return () => {
      setLoaded(false)
      setAlbum([])
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('inputs', inputs)   
    axiosPrivate.put(`/album/byId/${id}/rate`, inputs)
    .then(res => {
        console.log('rated album', res.data)
      })
    .catch(err => console.log('error: ', err.response))
  }

  const localconvertDuration = (duration) => {
    let minutes = duration/60 | 0
    let seconds = duration%60
    
    minutes = minutes.toString()
    if(seconds < 10) {
      seconds = seconds.toString()
      seconds = "0".concat(seconds)
    } else seconds = seconds.toString() 
    let finalDuration = minutes.concat(":", seconds)
    return finalDuration
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
    <div>
      <NavBarWrapper />
      <div className="cution container"></div>
      <div className="centered-block centered-content-along-y rating-form-body shadow"
        style={{
          padding: `${width/90}px`
        }}
      >
        <h3 className="rating-form-header"
          style={{
            marginBottom: `${width/50}px`
          }}
        >{loaded ? album.albumName : "fetching..."} - {loaded ? album.author : "fetching..."}</h3>
        <form className='rate-album-form centered-content-along-y' onSubmit={handleSubmit}>
          {
            loaded ? album?.songs
              ?.sort((a, b) => parseFloat(a.position) - parseFloat(b.position))
              .map((song, index) => {
              return (
                <SongRatingEntry 
                  key={song.songId} 
                  index={index}
                  songName={song.songName} 
                  songDuration={localconvertDuration(song.songDurationInSeconds)} 
                  inputs={inputs}
                  setInputs={setInputs}
                  rerate={false}
                  defaultValue={''}
                />
              )
            }) : <div className='fetching'>fetching...</div>
          }
          <button className="card-button rate-button" type="submit">Rate</button>
        </form>
      </div>  
    </div>
  )
}

export default RateAlbumPage  
