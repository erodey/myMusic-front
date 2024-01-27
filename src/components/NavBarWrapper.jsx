import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import HamburgerMenu from './HamburgerMenu'


const NavBarWrapper = () => {

  const [width, setWidth] = useState(window.innerWidth)
  const breakpoint = 800

  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth)

    window.addEventListener("resize", handleResizeWindow)

    return () => {
      window.removeEventListener("resize", handleResizeWindow)
    }
  }, [])


  useEffect(() => {
    console.log('width', width)
  }, [width])

  return (
    <>
      {
        width > breakpoint ? <NavBar /> : <HamburgerMenu /> 
      }
    </>
  )
}

export default NavBarWrapper  
