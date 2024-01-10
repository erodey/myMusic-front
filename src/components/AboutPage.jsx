import React from 'react'
import NavBar from './NavBar'
import Header from './Header'
import '../styles/AboutPage.css'

const AboutPage = () => {
  return (
    <div>
      <NavBar />
      <Header topic={"about"} />
      <p className='container shadow about-description'>
        This website is a personal project of Amanbay Yernar, Almaty, Kazakhstan. <br/> <br/>
        This app is about rating ownselves music taste. A person who has an account can rate albums from the available ones within the website. 
        The rating of an album is meant to be an accurate representation of one's musical sentiment towards the album. How it works: <br/>
        Each song of the album will be rated from 0 to 10 inclusively, where 0 represents absolute distaste and 10 meaning a song is masterpiece. 
        5, intuitively, represents a neutral attitude. Then the rating is averaged. However, to represent the ratings even more accurately, 
        the duraiton is taken into account. The duration of the song is multiplied by the song's rating, summed over all songs, 
        is divided by the total duration of the album. <br/><br/> So far, only I can enter the information about the albums, 
        however in near updates there will be a way for users (if there will be any other than me lol) contribute in that regard. 
        It is because users may want to count some songs within the album rating while others don't. Skits, conversations, fillers between songs,
        or something similar may be ignored in determining the album's rating.
        <br/><br/> The app is build with Spring Boot and React Js.
      </p>
    </div>
  )
}

export default AboutPage  
