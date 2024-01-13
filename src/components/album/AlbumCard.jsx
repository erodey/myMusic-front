import React from 'react'
import '../../styles/Card.css'
import { Link } from 'react-router-dom'

function AlbumCard({albumId, src, title, description}) {

  return (
    <div className='container card'>
      <img src={src} alt='album-cover'/>
      <div className="card-body">
        <div className="card-main">
          <h1 className="card-title">{title}</h1>
        </div>
        <div className='centered-content-along-y'>
          <Link className='card-button' to={`/albums/${albumId}`}>View Details</Link>
          <Link className='card-button' to={`/albums/${albumId}/rate`}>Rate</Link>
        </div>
      </div>
    </div>
  )
}

export default AlbumCard 