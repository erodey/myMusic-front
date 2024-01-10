import '../../styles/Card.css'
import { Link } from 'react-router-dom'

function AlbumRatingCard({albumId, src, title, albumRating}) {

  return (
    <div className='container card'>
      <img src={src} alt='album-cover'/>
      <div className="card-body">
        <div className="card-main">
          <h1 className="card-title">{title}</h1>
          <p className="card-description">Rating: {albumRating}</p>
        </div>
        <div className='centered-content-along-y card-links'>
          <Link to={`/albums/${albumId}`}>View Details</Link>
          <Link to={`/albums/${albumId}/rerate`}>Rerate</Link>
        </div>
      </div>
    </div>
  )
}

export default AlbumRatingCard 
