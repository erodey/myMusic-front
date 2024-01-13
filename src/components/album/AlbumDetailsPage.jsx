import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'    
import NavBar from '../NavBar'
import AlbumDetails from './AlbumDetails'

function AlbumDetailsPage() {

  const { id } = useParams()

  const [album, setAlbum] = useState({})

  useEffect(() => {
    fetch(`http://localhost:8080/api/album/byId/${id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((data) => {
      setAlbum(data)
    })
  }, [])

  return (
    <div>
      <NavBar /> 
      <AlbumDetails 
        album={album} 
      />
    </div>
  )
}

export default AlbumDetailsPage 
