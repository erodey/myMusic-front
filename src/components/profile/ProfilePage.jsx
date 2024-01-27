import React, { useState,useEffect } from 'react'
import Header from '../Header'
import AlbumRatingCard from './AlbumRatingCard'
import useAuth from '../../hooks/useAuth'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { useLocation, useNavigate } from 'react-router-dom'
import NavBarWrapper from '../NavBarWrapper'

function ProfilePage() {
  const [ratedAlbums, setRatedAlbums] = useState([])
  const [loaded, setLoaded] = useState(false)
  const {auth, setAuth} = useAuth() 
  const axiosPrivate = useAxiosPrivate()
  
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = async () => {
    setAuth({})
    await axiosPrivate.post("/auth/logout", {
    })
  }


  useEffect(() => {
    
    console.log('auth: ', auth)

    const getData = async () => {
      try {
        const res = await axiosPrivate.get("/album/getUserAlbumRatings")
        setRatedAlbums(res.data)
        setLoaded(true)
      } catch (error) {
        console.log('error.data', error.data)
        setAuth({})
        navigate('/login', {state: { from: location}, replace: true})
      }
    }

    getData()

  }, [])


  return (
    <div>
      <NavBarWrapper />
      <div className='container' style={ {display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '70px'} }>
        <div></div>
        <button 
          className='card-button button'
          type="button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>    
      <Header topic={"profile"}/>      
      <div>
        {
          loaded ? ratedAlbums
            ?.sort((a, b) => parseFloat(b.albumRating) - parseFloat(a.albumRating))
            ?.map((album) => {
            console.log('album', album)
            return (
              <AlbumRatingCard key={album.albumId} 
                albumId={album.albumId} 
                src={album.albumCover} 
                albumName={album.albumName}
                author={album.albumAuthor} 
                releaseYear={album.releaseYear}
                albumRating={album.albumRating}/>
            )
          }) : <div className='fetching'>fetching...</div>
        }
      </div>
    </div>
  )
}

export default ProfilePage  
