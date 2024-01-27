import React, { useEffect, useRef, useState } from 'react'
import SongRatingEntry from './SongRatingEntry'
import { useParams } from 'react-router-dom'
import '../../styles/RateAlbumPage.css'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import NavBarWrapper from '../NavBarWrapper'

const ReRateAlbumPage = () => {

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
        const response = await axiosPrivate.get(`/album/byId/${id}/getTheUserAlbumRating`)
        setAlbum(response.data)
        const tempInputs = response.data.ratedSongs.map((ratedSong) => {
            return {songName: ratedSong.songName, songRating: ratedSong.songRating}
          })
        setInputs(tempInputs)
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
        >{loaded ? album.albumName : "fetching..."} - {loaded ? album.albumAuthor : "fetching..."}</h3>
        <form className='rate-album-form centered-content-along-y' onSubmit={handleSubmit}>
          {
            loaded ? album?.ratedSongs.map((song, i) => {
              return (
                <SongRatingEntry 
                  key={song.songId} 
                  songName={song.songName} 
                  index={i}
                  songDuration={song.songDurationInSeconds} 
                  inputs={inputs}
                  setInputs={setInputs}
                  rerate={true}
                  defaultValue={`${song.songRating}`}
                />
              )
            }) : <div className='fetching'>fetching...</div>
          }
          <button className="rate-button card-button" type="submit">Rate</button>
        </form>
      </div>  
    </div>
  )
}

export default ReRateAlbumPage  
