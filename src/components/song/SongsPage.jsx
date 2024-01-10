import React, { useEffect, useState } from 'react'
import SongCard from './SongCard'
import NavBar from '../NavBar'
import Header from '../Header'
import SearchBar from '../SearchBar'
import axios from '../../api/axios'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'

function SongsPage() {

  const axiosPrivate = useAxiosPrivate()

  const [songs, setSongs] = useState([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    axiosPrivate.get("/song/all")
    .then((res) => {
      setSongs(res.data)
      setLoaded(true)
    })
  }, [])


  return (
    <div>
      <NavBar />
      <Header topic={"songs"}/>
      <SearchBar placeHolder=' search...' toAlt={false} topic={"songs"}/>
      <div>
        {
          loaded ? songs.map((song) => {
            return (
              <SongCard key={song.songId} 
                songId={song.songId} 
                src={song.src} 
                title={song.songName + ' - ' + song.author} 
                description='this is description'/>
            )
          }) : <div className='fetching'>fetching...</div>
        }
      </div>
    </div>
  )
}

export default SongsPage
