import React, { useEffect, useState } from 'react'
import AlbumCard from './AlbumCard'
import NavBar from '../NavBar'
import Header from '../Header'
import SearchBar from '../SearchBar'
import { useLocation } from 'react-router-dom'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'

function AlbumsSearchPageAlt() {

  const location = useLocation()
  const {text} = location.state

  const [albums, setAlbums] = useState([])
  const [loaded, setLoaded] = useState(false)

  const axiosPrivate = useAxiosPrivate()

  useEffect(() => {
    axiosPrivate.get(`/album/searchAlbum/${text}`).then((res) => {
      setAlbums(res.data)
    })
  }, [])

  return (
    <div>
      <NavBar />
      <Header topic={"albums"}/>
      <SearchBar placeHolder={text} toAlt={false} topic={'albums'}/>
      <div>
        {
          ((albums) => {
            if(loaded){
              return albums.length != 0 ? albums.map((album) => {
                return (
                  <AlbumCard key={album.albumId} 
                    albumId={album.albumId} 
                    src={album.coverImageUrl} 
                    albumName={album.albumName}
                    author={album.author}
                    releaseYear={album.releaseYear}
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

export default AlbumsSearchPageAlt
