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

  const [innerWidth, setInnerWidth] = useState(window.innerWidth)
  const breakpoint = 600
  const [width, setWidth] = useState()

  useEffect(() => {
    const handleResizeWindow = () => setInnerWidth(window.innerWidth)

    window.addEventListener("resize", handleResizeWindow)

    return () => {
      window.removeEventListener("resize", handleResizeWindow)
    }
  }, [])
  
  useEffect(() => {
    let temp = breakpoint > innerWidth ? breakpoint : innerWidth
    setWidth(temp)
  }, [innerWidth])

  useEffect(() => {
    setAlbum(props.album)
    setSongInfo(props.album.songs)
  }, [props.album, props.album.songs])

  console.log(songInfo)

  return (
    <div 
      className='container album-details'
      style={{
        padding: `${width/90}px`
      }}
    >
      <div 
        className="album-details-header"
        style={{
          height: `${width/8.5}px`,
        }}>
        <div className='album-details-header-inner'>
          <img 
            src={album.coverImageUrl} 
            alt="album-cover" 
            style={{
              height: `${width/8.5}px`,
              marginRight:`${width/150}px`
            }}
          />
          <div>
            <p
              className='album-details-title'
              style={{
                fontSize: `${width/50}px`
              }}
            >{album?.albumName} - {album?.author}</p>   
            <div 
              className="album-description"
              style={{
                marginTop: `${width/200}px`, 
                fontSize: `${width/80}px`
            }}>
              released in: {album?.releaseYear}
            </div>
          </div>
        </div>
        <div
          style={{
            height: '100%',
          }}>
          <Link 
            className='card-button' 
            to={`/albums/${id}/edit`}
            style={{
              fontSize: '1rem', 
              padding: '0.2rem', 
            }}
          >Edit</Link>
        </div>
      </div>

      <div 
        className="album-details-body"
      >
        <p>Tracklist</p>
        <table 
          className='tracklist-table'
        >
          <thead>
            <tr>
              <th 
                scope='column'
              ></th>
              <th 
                scope='column'
                style={{
                  width: `${94 - (1900-width)/100}%`
                }}
              ></th>
              <th 
                scope='column'
                style={{
                  width: `${(1900-width)/100 + 1}%`
                }}
              ></th>
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
