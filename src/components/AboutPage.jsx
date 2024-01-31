import React from 'react'
import Header from './Header'
import '../styles/AboutPage.css'
import NavBarWrapper from './NavBarWrapper'

const AboutPage = () => {
  return (
    <div>
      <NavBarWrapper />
      <div className='full-screen'>
        <section className='section-2'>
          <p className='centered-block'>This app is about rating ownselves music taste. A person who has an account can rate albums from the available ones within the website. 
          The rating of an album is meant to be an accurate representation of one's musical sentiment towards the album.</p>
          <section className='album-section'>
            <div className='section-div-8' 
              style={{
                background: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(https://hiphop-n-more.com/wp-content/uploads/2014/08/all-eyez-on-me.jpg) no-repeat center / cover"
              }}
            ></div> 
            <div className='section-div-8' 
              style={{
                background: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(https://i.discogs.com/ELFjAL-SDnKzGqivllcEbROIgURx0g9BKNcGwFFz2MU/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTcwOTcw/NTEtMTU1NjQ0NDE4/MC03NTA1LmpwZWc.jpeg) no-repeat center / cover"
              }}
            ></div>
            <div className='section-div-8' 
              style={{
                background: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(https://images.radiox.co.uk/images/56656?crop=16_9&width=660&relax=1&signature=jX8U1n3p5cKosEVZGAmOIpV9nfU=) no-repeat center / cover"
              }}
            ></div>
            <div className='section-div-8' 
              style={{
                background: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(https://streetshop.at/media/image/23/2a/df/nas-illmatic.jpg) no-repeat center / cover"
              }}
            ></div>
            <div className='section-div-8' 
              style={{
                background: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(https://i.discogs.com/-kAmWGk00BJIwCQMp9xo_ynIYGRpvDDRUD9NayOhr40/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTc0MDQ1/NDMtMTUyMDExNjg4/Ny05MTc5LmpwZWc.jpeg) no-repeat center / cover"
              }}
            ></div>
          </section>
        </section>
        {/* <section className='section-3 shadow centered-block'> */}
        {/*   <p className='centered-block'> */}
        {/*     How does it work? <br/><br/> */}
        {/*     Each song of the album will be rated from 0 to 10 inclusively, where 0 represents absolute distaste and 10 meaning a song is masterpiece.  */}
        {/*     5, intuitively, represents a neutral attitude. Then the rating is averaged. However, to represent the ratings even more accurately,  */}
        {/*     the duraiton is taken into account. The duration of the song is multiplied by the song's rating, summed over all songs,  */}
        {/*     is divided by the total duration of the album.   */}
        {/*   </p> */}
        {/* </section> */}
        <section className='section-4'>
          <p className='centered-block'>
            This website is a personal project of Amanbay Yernar, Almaty, Kazakhstan. 
            The app is build with Spring Boot and React Js.
          </p>
          <section className='album-section'>
            <div className='section-div-8' 
              style={{
                background: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(https://hiphop-n-more.com/wp-content/uploads/2014/08/all-eyez-on-me.jpg) no-repeat center / cover"
              }}
            ></div>
            <div className='section-div-8' 
              style={{
                background: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(https://hiphop-n-more.com/wp-content/uploads/2014/08/all-eyez-on-me.jpg) no-repeat center / cover"
              }}
            ></div>
            <div className='section-div-8' 
              style={{
                background: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(https://hiphop-n-more.com/wp-content/uploads/2014/08/all-eyez-on-me.jpg) no-repeat center / cover"
              }}
            ></div>
            <div className='section-div-8' 
              style={{
                background: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(https://hiphop-n-more.com/wp-content/uploads/2014/08/all-eyez-on-me.jpg) no-repeat center / cover"
              }}
            ></div>
            <div className='section-div-8' 
              style={{
                background: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(https://hiphop-n-more.com/wp-content/uploads/2014/08/all-eyez-on-me.jpg) no-repeat center / cover"
              }}
            ></div>
          </section>
        </section>
      </div>
    </div>
  )
}

export default AboutPage  
