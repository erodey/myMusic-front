import React, { useEffect, useState } from 'react'
import '../../styles/AlbumDetails.css'
import SongInfo from '../song/SongInfo'
// import { useNavigate} from "react-router-dom"

function AlbumDetails(props) {

  const [album, setAlbum] = useState({})
  const [songInfo, setSongInfo] = useState([{}])
  // const navigate = useNavigate()

  useEffect(() => {
    setAlbum(props.album)
    setSongInfo(props.album.songs)
  }, [props.album, props.album.songs])

  console.log(songInfo)

  return (
    <div className='container album-details'>
      {/* <button onClick={() => navigate(-1)}>Back</button> */}
      <div className="album-details-header">
        <img src={album.coverImageUrl} alt="album-cover" />
        <div>
          <h1>{album?.albumName} - {album?.author}</h1>   
          <p>Description</p>
        </div>
      </div>
      <div className="container album-details-body">
        <p>
          Album name: {album?.albumName} <br/>
          Author: {album?.author} <br/>
          Date of release: {album?.releaseDate} <br/>
          Total number of songs: {album?.numberOfSongs} <br/>
          Current number of songs: {album?.currentNumberOfSongs} <br/>
          Current songs: <br/>
          <>
            {
              songInfo?.map((song) => {
                return (
                  <SongInfo 
                    key={song.songId} 
                    song={song} 
                  />
                )
              })
            }
          </>
        </p>
      </div>
    </div>
  )
}

export default AlbumDetails 
