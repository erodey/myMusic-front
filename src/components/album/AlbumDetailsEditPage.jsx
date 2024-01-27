import React, { useEffect, useState } from 'react'
import AlbumDetailsEdit from './AlbumDetailsEdit'
import { useParams } from 'react-router-dom'
import { axiosPrivate } from '../../api/axios'
import useAuth from '../../hooks/useAuth'
import { useLocation, useNavigate } from 'react-router-dom'
import NavBarWrapper from '../NavBarWrapper'

function AlbumDetailsEditPage() {

  const [album, setAlbum] = useState({})
  const [loaded, setLoaded] = useState(false)
  const { id } = useParams()
  const {auth, setAuth} = useAuth()

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const getData = async () => {
      try {
          const response = await axiosPrivate.get(`http://localhost:8080/api/album/byId/${id}`)
          setAlbum(response.data)
          setLoaded(true)
      } catch (error) {
        setAuth({})
        navigate('/login', {state: { from: location}, replace: true})
      }
    }

    getData()
  }, [])


  console.log('album', album)

  return (
    <div>
      <NavBarWrapper />
      <div className="cution container"></div>
      { 
        loaded ? 
          <AlbumDetailsEdit 
            albumProps={album}
          /> : <></>
      }
    </div>    
  )
}

export default AlbumDetailsEditPage
