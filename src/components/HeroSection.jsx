import React from 'react'
import NavBar from './NavBar'
import '../styles/HeroSection.css'
import HomeSection from './home/HomeSection'

function HeroSection() {
  return (
    <div id='hero-section'>
      <NavBar />
      <HomeSection />
    </div>

  )
}

export default HeroSection  
