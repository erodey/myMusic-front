import React from 'react'
import NavBar from '../NavBar'
import '../../styles/HeroSection.css'
import HomeSection from './HomeSection'
import HamburgerMenu from '../HamburgerMenu'
import NavBarWrapper from '../NavBarWrapper'

function HomePage() {
  return (
    <div id='hero-section'>
      <NavBarWrapper />
      {/* <NavBar /> */}
      {/* <HamburgerMenu /> */}
      <HomeSection />
    </div>

  )
}

export default HomePage  
