import React, { useEffect, useState } from 'react'
import AlbumCard from './AlbumCard'
import NavBar from '../NavBar'
import Header from '../Header'
import SearchBar from '../SearchBar'
import { axiosPrivate } from '../../api/axios'
import AddAlbumLink from './AddAlbumLink'

function AlbumsPage() {

  const [albums, setAlbums] = useState([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    
    axiosPrivate.get("/album/all").then((res) => {
      setAlbums(res.data)
      setLoaded(true)
    })
  }, [])


  return (
    <div>
      <NavBar />
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
                title={album.albumName + ' - ' + album.author} 
                description='this is description'/>
            )
          }) : <div className='fetching'>fetching...</div>
        }
      </div>
    </div>
  )
}

export default AlbumsPage
