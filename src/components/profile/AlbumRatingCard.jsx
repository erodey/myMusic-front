import '../../styles/Card.css'
import { Link } from 'react-router-dom'

function AlbumRatingCard({albumId, src, albumName, author, albumRating}) {

  return (
    <div className='container card'>
      <div className='card-body'>
        <img src={src} alt='album-cover' />
        <div className="card-header">
          <p className="card-title">{albumName} - {author}</p>
          <p className="card-description"> 
            rated as a {albumRating}
          </p>
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
            to={`/albums/${albumId}/rerate`}
            style={{
              width: '7vw'
            }}
          >Rerate</Link>
        </div>
      </div>
    </div>
  )
}

export default AlbumRatingCard 
