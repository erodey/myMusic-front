import React, { useEffect, useRef, useState } from 'react'
import NavBar from '../NavBar'
import SongRatingEntry from './SongRatingEntry'
import { useParams } from 'react-router-dom'
import '../../styles/RateAlbumPage.css'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'

const RateAlbumPage = () => {

  const axiosPrivate = useAxiosPrivate()
  const [album, setAlbum] = useState({})
  const [inputs, setInputs] = useState([])
  const {id} = useParams()
  const [loaded, setLoaded] = useState(false)

  useEffect(()=>{
    axiosPrivate.get(`/album/byId/${id}`)
    .then((res) => {
      setAlbum(res.data)
      setLoaded(true)
    })
    .catch(er => console.log('error: ', er.response))

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

  return (
    <div>
      <NavBar />
      <div className="container centered-content-along-y rating-form-body shadow">
        <h3 className="rating-form-header">{loaded ? album.albumName : "fetching..."} - {loaded ? album.author : "fetching..."}</h3>
        <form className='rate-album-form centered-content-along-y' onSubmit={handleSubmit}>
          {
            loaded ? album?.songs.map((song, index) => {
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
          <button className="rate-button" type="submit">Rate</button>
        </form>
      </div>  
    </div>
  )
}

export default RateAlbumPage  
