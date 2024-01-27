import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'    
import AlbumDetails from './AlbumDetails'
import NavBarWrapper from '../NavBarWrapper'

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

  console.log('album', album)

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
