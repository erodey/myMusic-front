import React from 'react'
import Header from './Header'
import '../styles/AboutPage.css'
import NavBarWrapper from './NavBarWrapper'

const AboutPage = () => {
  return (
    <div>
      <NavBarWrapper />
      <Header topic={"about"} />
      <p className='container about-description centered-text'>

        This app is about rating ownselves music taste. A person who has an account can rate albums from the available ones within the website. 
        The rating of an album is meant to be an accurate representation of one's musical sentiment towards the album. <br/><br/> How does it work? <br/><br/>
        Each song of the album will be rated from 0 to 10 inclusively, where 0 represents absolute distaste and 10 meaning a song is masterpiece. 
        5, intuitively, represents a neutral attitude. Then the rating is averaged. However, to represent the ratings even more accurately, 
        the duraiton is taken into account. The duration of the song is multiplied by the song's rating, summed over all songs, 
        is divided by the total duration of the album.  
        <br/><br/> This website is a personal project of Amanbay Yernar, Almaty, Kazakhstan. 
        <br/>The app is build with Spring Boot and React Js.
      </p>
    </div>
  )
}

export default AboutPage  
