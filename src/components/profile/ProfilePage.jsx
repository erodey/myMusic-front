import React, { useState,useEffect } from 'react'
import NavBar from '../NavBar'
import Header from '../Header'
import AlbumRatingCard from './AlbumRatingCard'
import useAuth from '../../hooks/useAuth'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'

function ProfilePage() {
  const [ratedAlbums, setRatedAlbums] = useState([])
  const [loaded, setLoaded] = useState(false)
  const {auth} = useAuth() 
  const axiosPrivate = useAxiosPrivate()


  useEffect(() => {
    
    console.log('auth: ', auth)

    axiosPrivate.get("/album/getUserAlbumRatings").then((res) => {
      setRatedAlbums(res.data)
      setLoaded(true)
    })
  }, [])


  return (
    <div>
      <NavBar />
      <Header topic={"profile"}/>      
      <div>
        {
          loaded ? ratedAlbums.map((album) => {
            return (
              <AlbumRatingCard key={album.albumId} 
                albumId={album.albumId} 
                src={album.albumCover} 
                title={album.albumName + ' - ' + album.albumAuthor} 
                albumRating={album.albumRating}/>
            )
          }) : <div className='fetching'>fetching...</div>
        }
      </div>
    </div>
  )
}

export default ProfilePage  
