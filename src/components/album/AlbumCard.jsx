import React, { useEffect, useState } from 'react'
import '../../styles/Card.css'
import { Link } from 'react-router-dom'

function AlbumCard({albumName, author, albumId, src, releaseYear, description}) {

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

  return (
    <div className='container card'>
      <div className='card-body'>
        <img src={src} alt='album-cover' />
        <div className="card-header">
          <p className="card-title">{albumName} - {author}</p>
          <p className='card-description'>released in: {releaseYear}</p>
        </div>
      </div>
      <div className="card-links">
        <div className='centered-content-along-y centered-text'>
          <Link 
            className='card-button' 
            to={`/albums/${albumId}`}
            style={{
              width: '7vw',
              marginBottom: '0.5vw'

            }}
          >View Details</Link>
          <Link 
            className='card-button' 
            to={`/albums/${albumId}/rate`}
            style={{
              width: '7vw'
            }}
          >Rate</Link>
        </div>
      </div>
    </div>
  )
}

export default AlbumCard 
