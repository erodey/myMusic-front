import React from 'react'
import '../../styles/HomeSection.css'
import { Link } from 'react-router-dom'

function HomeSection() {
  return (
    <section id="home-section">
      <div className="container">
        <div className="info">
          <h1>Hello, this is a website where you can rate your music.  </h1>
          <h2>(under development)</h2>
          {/* <p>  */}
          {/*   The idea is very simple. You like an album and want to rate it from 0 to 10. In order to do that, you rate each song of the album separately from 0 to 10, */}
          {/*   where 0 represents your absolute hate towards the song, while 10 means a song is a masterpiece that you can listen to on repeat.  */}
          {/*   As you might have guessed, a score of 5 is given to a song that is neutral to you. After you have rated each song, I will calculate the overall rating of the song by this formula: */}
          {/*   sum((rating of a song) * (duration of the song in seconds))/(total duration of the whole album). */}
          {/*   This way, albums will be rated accurately. The longer the good songs play and the less the bad songs play, the higher the score. */}
          {/* </p> */}
          <Link to="/about">learn more</Link>
        </div>
        
      </div>
    </section>
  )
}

export default HomeSection  
