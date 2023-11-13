import React, { useEffect, useState } from 'react'
import Card from '../Card'
import NavBar from '../NavBar'
import AlbumHeader from './AlbumHeader'
import SearchBar from '../SearchBar'

function AlbumsPage() {


  const [albums, setAlbums] = useState([])

  useEffect(() => {
    fetch("http://localhost:8080/api/album/all", {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((data) => {
      setAlbums(data)
    })
  }, [])

  return (
    <div>
      <NavBar />
      <AlbumHeader />
      <SearchBar placeHolder=' search...' toAlt={false} topic={"albums"}/>
      <div>
        {
          albums.map((album) => {
            return (
              <Card key={album.albumId} 
                albumId={album.albumId} 
                src={album.coverImageUrl} 
                image='albums_wallpaper.png' 
                title={album.albumName + ' - ' + album.author} 
                description='this is description'/>
            )
          })
        }
      </div>
    </div>
  )
}

export default AlbumsPage
