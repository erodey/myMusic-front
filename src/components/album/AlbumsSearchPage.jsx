import React, { useEffect, useState } from 'react'
import Card from '../Card'
import NavBar from '../NavBar'
import AlbumHeader from './AlbumHeader'
import SearchBar from '../SearchBar'
import { useLocation } from 'react-router-dom'
import '../../styles/AlbumSearchPage.css'

function AlbumsSearchPage() {

  const location = useLocation()
  const {text} = location.state

  const [albums, setAlbums] = useState([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    fetch(`http://localhost:8080/api/album/searchAlbum/${text}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((data) => {
        setAlbums(data)
        setLoaded(true)
    })
  }, [])

  console.log('albums', albums)

  return (
    <div>
      <NavBar />
      <AlbumHeader />
      <SearchBar placeHolder={text} toAlt={true} topic={'albums'}/>
      <div>
        {
          ((albums) => {
            if(loaded){
              return albums.length != 0 ? albums.map((album) => {
                return (
                  <Card key={album.albumId} 
                    albumId={album.albumId} 
                    src={album.coverImageUrl} 
                    image='albums_wallpaper.png' 
                    title={album.albumName + ' - ' + album.author} 
                    description='this is description'/>
                )
              }) : <div className='album-not-found container centered-content centered-text'> <h2>Could not find any album match for "{text}" in the database :( </h2> </div>
            } else return <div className='album-loading container centered-content centered-text'> <h3> fetching data... </h3> </div>
          })(albums)
        }
      </div>
    </div>
  )
}

export default AlbumsSearchPage
