import React, { useEffect, useRef, useState } from 'react'
import NavBar from '../NavBar'
import SongRatingEntry from './SongRatingEntry'
import { useParams } from 'react-router-dom'
import '../../styles/RateAlbumPage.css'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'

const ReRateAlbumPage = () => {

  const axiosPrivate = useAxiosPrivate()
  const [album, setAlbum] = useState({})
  const [inputs, setInputs] = useState([])
  const {id} = useParams()
  const [loaded, setLoaded] = useState(false)

  useEffect(()=>{
    axiosPrivate.get(`/album/byId/${id}/getTheUserAlbumRating`)
    .then((res) => {
      setAlbum(res.data)
      const tempInputs = res.data.ratedSongs.map((ratedSong) => {
          return {songName: ratedSong.songName, songRating: ratedSong.songRating}
        })
      setInputs(tempInputs)
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

  return (
    <div>
      <NavBar />
      <div className="container centered-content-along-y rating-form-body shadow">
        <h3 className="rating-form-header">{loaded ? album.albumName : "fetching..."} - {loaded ? album.albumAuthor : "fetching..."}</h3>
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
          <button className="rate-button" type="submit">Rate</button>
        </form>
      </div>  
    </div>
  )
}

export default ReRateAlbumPage  
