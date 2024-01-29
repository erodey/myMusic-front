import React, { useEffect, useState } from 'react'
import AlbumCard from './AlbumCard'
import Header from '../Header'
import SearchBar from '../SearchBar'
import AddAlbumLink from './AddAlbumLink'
import NavBarWrapper from '../NavBarWrapper'
import axios from '../../api/axios'

function AlbumsPage() {

  const [albums, setAlbums] = useState([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    
    axios.get("/album/all").then((res) => {
      setAlbums(res.data)
      setLoaded(true)
    })
  }, [])


  return (
    <div>
      <NavBarWrapper />
      {/* <NavBar /> */}
      <Header topic={"albums"}/>
      <AddAlbumLink />
      <SearchBar placeHolder=' search...' toAlt={false} topic={"albums"}/>
      <div>
        {
          loaded ? albums.map((album) => {
            return (
              <AlbumCard key={album.albumId} 
                albumId={album.albumId} 
                src={album.coverImageUrl} 
                albumName={album.albumName}
                author={album.author}
                releaseYear={album.releaseYear}
                description='this is description'/>
            )
          }) : <div className='fetching'>fetching...</div>
        }
      </div>
    </div>
  )
}

export default AlbumsPage
