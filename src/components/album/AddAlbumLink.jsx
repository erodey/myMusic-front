import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/AddAlbumLink.css'

const AddAlbumLink = () => {
  return (
    <div className='container centered-content' style={{marginBottom: '1rem'}}>
      <p style={ { marginRight: '1rem'}}>Want to add an album?</p>
      <Link className='card-button button' to={"/albums/addAlbum"} style={{textAlign: 'center'}}>Add Album</Link>
    </div>
  )
}

export default AddAlbumLink 
