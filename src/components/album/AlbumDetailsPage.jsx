import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'    
import AlbumDetails from './AlbumDetails'
import NavBarWrapper from '../NavBarWrapper'
import { axiosPrivate } from '../../api/axios'

function AlbumDetailsPage() {

  const { id } = useParams()

  const [album, setAlbum] = useState({})

  useEffect(() => {
    axiosPrivate.get(`/album/byId/${id}`).then((res) => {
      setAlbum(res.data)
    })
  }, [])

  return (
    <div>
      <NavBarWrapper />
      <div className="cution container"></div>
      <AlbumDetails 
        album={album} 
      />
    </div>
  )
}

export default AlbumDetailsPage 
