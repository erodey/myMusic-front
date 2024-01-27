import React, { useEffect, useState } from 'react'
import '../styles/HamburgerMenu.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'



const HamburgerMenu = () => {

  const [drop, setDrop] = useState(false)
  const [inHome, setInHome] = useState(true)
  const [className, setClassName] = useState('')
  
  let path = window.location.pathname

  useEffect(() => {
    if (path == '/' || path == '/home'){
      setClassName('in-home')
      setInHome(true)
    } else {
      setInHome(false)
    }
  }, [])

  const toggleMenu = () => {
    setDrop(!drop)
  }



  return (
    <div className='hamb-menu-main centered-block'>
      <div className={`hamburger-menu ${className}`}>
        <div className="logo"></div>
        {
          inHome ? 
          <FontAwesomeIcon 
            icon={faBars} 
            style={{
              fontSize: '30px', 
              marginRight: '26px', 
              cursor: 'pointer',
              color: 'white'
            }}
            onClick={toggleMenu}
          />
          :
          <FontAwesomeIcon 
            icon={faBars} 
            style={{
              fontSize: '30px', 
              marginRight: '26px', 
              cursor: 'pointer'
            }}
            onClick={toggleMenu}
          />
        }
      </div>
      <nav className='hamb-nav' style={{height: `${drop ? '100px' : '0px'}`, transition: 'height .5s' }}>
        {
          inHome ?
          <ul className={`ul-inside-nav ${className}`}>
            <CustomLink to="/" color='white'>Home</CustomLink>
            <CustomLink to="/albums" color='white'>Albums</CustomLink>
            <CustomLink to="/about" color='white'>About</CustomLink>
            <CustomLink to="/profile" color='white'>Profile</CustomLink>
          </ul>
          :
          <ul className='ul-inside-nav'>
            <CustomLink to="/">Home</CustomLink>
            <CustomLink to="/albums">Albums</CustomLink>
            <CustomLink to="/about">About</CustomLink>
            <CustomLink to="/profile">Profile</CustomLink>
          </ul>
        }
      </nav>

    </div>
  )
}


function CustomLink ({to, color, children, ...props}) {
  return (
    <li>
      {
        color == 'white' ? 
        <Link to={to} style={{color: 'white'}} {...props}>
          {children}
        </Link>
        : 
        <Link to={to} {...props}>
          {children}
        </Link>
      }
    </li>
  )
}

export default HamburgerMenu  
