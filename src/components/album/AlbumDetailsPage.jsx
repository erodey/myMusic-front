import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'    
import NavBar from '../NavBar'
import AlbumDetails from './AlbumDetails'

function AlbumDetailsPage() {

  const { id } = useParams()

  const [album, setAlbum] = useState({})
  const navigate = useNavigate()

  const moveToEdit = () => {
    navigate(`/albums/${id}/edit`)
  }

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
      <button type="button" onClick={moveToEdit }>edit</button>
      <AlbumDetails 
        album={album} 
      />
    </div>
  )
}

export default AlbumDetailsPage 
