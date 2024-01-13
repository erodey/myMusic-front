import React, { useEffect, useState } from 'react'
import '../../styles/Card.css'
import '../../styles/AlbumDetails.css'
import SongInfo from '../song/SongInfo'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
// import { useNavigate} from "react-router-dom"

function AlbumDetails(props) {

  const [album, setAlbum] = useState({})
  const [songInfo, setSongInfo] = useState([{}])

  const { id } = useParams()
  const navigate = useNavigate()
  const moveToEdit = () => {
    navigate(`/albums/${id}/edit`)
  }

  useEffect(() => {
    setAlbum(props.album)
    setSongInfo(props.album.songs)
  }, [props.album, props.album.songs])

  console.log(songInfo)

  return (
    <div className='container album-details'>
      <div className="album-details-header">
        <div className='album-details-header-inner'>
          <img src={album.coverImageUrl} alt="album-cover" />
          <div>
            <h1>{album?.albumName} - {album?.author}</h1>   
            <div className='album-description'>
              <p> Year of release: {album?.releaseYear}</p>
            </div>
          </div>
        </div>
        <Link className='card-button' to={`/albums/${id}/edit`}>Edit</Link>
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
              songInfo
              ?.sort((a, b) => parseFloat(a.position) - parseFloat(b.position))
              ?.map((song, index) => {
                return (
                  <SongInfo 
                    key={song.songId} 
                    position={song.position}
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
