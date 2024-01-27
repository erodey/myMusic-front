import React from 'react'
import { useState } from 'react'

const AddAlbumHeader = ({inputs, setInputs}) => {

  const [albumName, setAlbumName] = useState('')
  const [author, setAuthor] = useState('')
  const [year, setYear] = useState('')
  const [cover, setCover] = useState('')
  const [total, setTotal] = useState('')


  return (
    <div className='shadow' style={{padding: '1rem 0'}}>
      <div className='add-album-entry'>
        <label>Album name</label>
        <input 
          type="text"
          value={albumName}
          onChange={(e)=>{
            setAlbumName(e.target.value)
          }}
          onBlur={()=>{
            setInputs({
              ...inputs,
              albumName: albumName
            })
          }}
          onKeyDown={()=>{
            setInputs({
              ...inputs,
              albumName: albumName
            })
          }}
          required
        />
      </div>
      <div className='add-album-entry'>
        <label>Author</label>
        <input 
          type="text"
          value={author}
          onChange={(e)=>{
            setAuthor(e.target.value)
          }}
          onBlur={()=>{
            setInputs({
              ...inputs,
              author: author
            })
          }}
          onKeyDown={()=>{
            setInputs({
              ...inputs,
              author: author
            })
          }}
          required
        />
      </div>
      <div className='add-album-entry'>
        <label>Year of release</label>
        <input 
          type="text"
          value={year}
          onChange={(e)=>{
            setYear(e.target.value)
          }}
          onBlur={()=>{
            setInputs({
              ...inputs,
              releaseYear: year
            })
          }}
          onKeyDown={()=>{
            setInputs({
              ...inputs,
              releaseYear: year
            })
          }}
          required
        />
      </div>
      <div className='add-album-entry'>
        <label>URL of cover image</label>
        <input 
          type="text"
          value={cover}
          onChange={(e)=>{
            setCover(e.target.value)
          }}
          onBlur={()=>{
            setInputs({
              ...inputs,
              coverImageUrl: cover
            })
          }}
          onKeyDown={()=>{
            setInputs({
              ...inputs,
              coverImageUrl: cover
            })
          }}
          required
        />
      </div>
    </div>
  )
}

export default AddAlbumHeader 
