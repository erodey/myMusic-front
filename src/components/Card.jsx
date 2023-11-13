import React from 'react'
import '../styles/Card.css'
import { Link } from 'react-router-dom'

function Card({albumId, src, title, description}) {

  return (
    <div className='container card'>
      <img src={src} alt='album-cover'/>
      <div className="card-body">
        <div className="card-main">
          <h1 className="card-title">{title}</h1>
          <p className="card-description">{description}</p>
        </div>
        <Link to={`/albums/${albumId}`}>View Details</Link>
      </div>
    </div>
  )
}

export default Card 
