import React, { useEffect, useState } from 'react'
import '../../styles/AlbumDetailsEdit.css'
import SongInfoEdit from '../song/SongInfoEdit'
import axios from '../../api/axios'
// import { useNavigate} from "react-router-dom"

function AlbumDetailsEdit({ albumProps }) {

  const [album, setAlbum] = useState({})
  const [songInfo, setSongInfo] = useState([{}])

  const [albumInfoToChange, setAlbumInfoToChange] = useState({})
  const [songsToChange, setSongsToChange] = useState([])

  const [collectTriggered, setCollectTriggered] = useState(false)

  const [albumName, setAlbumName] = useState('')
  const [author, setAuthor] = useState('')
  const [albumReleaseYear, setAlbumReleaseYear] = useState('')

  const [albumNameChanged, setAlbumNameChanged] = useState(false) 
  const [authorChanged, setAuthorChanged] = useState(false) 
  const [releaseYearChanged, setReleaseYearChanged] = useState(false) 


  useEffect(() => {
    setAlbum(albumProps) 
    setSongInfo(albumProps?.songs)
    setAlbumName(albumProps?.albumName)
    setAuthor(albumProps?.author)
    setAlbumReleaseYear(albumProps?.releaseYear)
    setSongsToChange(albumProps.songs.map((song, index) => {
      return {
        albumId: albumProps.albumId,
        songId: song.songId,
        songName: '',
        songDuration: '',
        code: 0
      }
    }))
    setAlbumInfoToChange({
      albumId: albumProps.albumId,
      albumName: '',
      author: '',
      releaseYear: '',
      numberOfSongs: '',
      code: 0
    })
  }, [])

  const collectData = () => {
    let code = 0
    let data = {...albumInfoToChange}

    if(albumNameChanged){
      data.albumName = albumName
      code += 1
    } 
    if(authorChanged){
      code += 2
      data.author = author
    } 

    if(releaseYearChanged){
      code += 4
      data.releaseYear = albumReleaseYear
    }

    data.code = code
    setAlbumInfoToChange(data)
  }

  const handleSubmit = () => {
    console.log('albumInfoToChange', albumInfoToChange)
    axios.put("/album/updateAlbum", albumInfoToChange)
    console.log('songsToChange', songsToChange)
    axios.put("/song/updateSongs", songsToChange)
  }

  return (
    <form className='centered-content-along-y container album-details-edit' onSubmit={(e) => {
      e.preventDefault()
      handleSubmit()
    }}>
      <div className="album-details-header-edit">
        <img src={album.coverImageUrl} alt="album-cover" />
        <div className='album-details-edit-header-inputs'>
          <input 
            type='text'
            value={albumName}
            onFocus={() => {
              if(!albumNameChanged){
                setAlbumName('')
                setAlbumNameChanged(true)
              } else setAlbumNameChanged(true)
            }}
            onChange={(e) => {
              setAlbumName(e.target.value)
            }}
            onBlur={collectData}
          /> - 
          <input 
            type='text'
            value={author}
            onFocus={() => {
              if(!authorChanged){
                setAuthor('')
                setAuthorChanged(true)
              } else setAuthorChanged(true)
            }}
            onChange={(e) => {
              setAuthor(e.target.value)
            }}
            onBlur={collectData}
          />   
          <div className='album-description'>
            <label> Year of release: </label><input 
              type="text" 
              name="releaseYear" 
              value={albumReleaseYear}
              onFocus={() => {
                if(!releaseYearChanged){
                  setAlbumReleaseYear('')
                  setReleaseYearChanged(true)
                } else setReleaseYearChanged(true)
              }}
              onChange={(e) => {
                setAlbumReleaseYear(e.target.value)
              }}
              onBlur={collectData}
            />
            <br/>
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
              songInfo
              ?.sort((a, b) => parseFloat(a.position) - parseFloat(b.position))
              ?.map((song, index) => {
                return (
                  <SongInfoEdit 
                    key={song.songId} 
                    index={index}
                    position={song.position}
                    song={song} 
                    songsToChange={songsToChange}
                    setSongsToChange={setSongsToChange}       
                  />
                )
              })
            }
          </tbody>
        </table>
      </div>
      <button className='card-button' type='submit'>Save</button>
    </form>
  )
}

export default AlbumDetailsEdit 