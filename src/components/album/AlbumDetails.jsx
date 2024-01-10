import React, { useEffect, useState } from 'react'
import '../../styles/AlbumDetails.css'
import SongInfo from '../song/SongInfo'
// import { useNavigate} from "react-router-dom"

function AlbumDetails(props) {

  const [album, setAlbum] = useState({})
  const [songInfo, setSongInfo] = useState([{}])

  useEffect(() => {
    setAlbum(props.album)
    setSongInfo(props.album.songs)
  }, [props.album, props.album.songs])

  console.log(songInfo)

  return (
    <div className='container album-details'>
      <div className="album-details-header">
        <img src={album.coverImageUrl} alt="album-cover" />
        <div>
          <h1>{album?.albumName} - {album?.author}</h1>   
          <div className='album-description'>
            <p> Year of release: {album?.releaseYear}</p>
            <p> Total number of songs: {album?.numberOfSongs}</p>
            <p> Current number of songs: {album?.currentNumberOfSongs}</p>
          </div>
        </div>
      </div>
      <div className="container album-details-body">
        <p>Tracklist</p>
        <table className='tracklist-table'>
          <thead>
            <tr>
              <th scope='column'></th>
              <th scope='column'></th>
              <th scope='column'></th>
            </tr>
          </thead>
          <tbody>
            {
              songInfo?.map((song, index) => {
                return (
                  <SongInfo 
                    key={song.songId} 
                    index={index}
                    song={song} 
                  />
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AlbumDetails 
