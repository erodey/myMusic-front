import React, { useEffect, useState } from 'react'
import NavBar from '../NavBar'
import AlbumDetailsEdit from './AlbumDetailsEdit'
import { useParams } from 'react-router-dom'

function AlbumDetailsEditPage() {

  const [album, setAlbum] = useState({})
  const [loaded, setLoaded] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    fetch(`http://localhost:8080/api/album/byId/${id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((data) => {
        console.log('data', data)
        setAlbum(data)
        setLoaded(true)
    })
  }, [])

  return (
    <div>
      <NavBar /> 
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
