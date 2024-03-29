import React from 'react'
import "../styles/NavBar.css"
import { Link } from 'react-router-dom'

function NavBar() {
  let path = window.location.pathname

  let className = "container"
  if (path != '/' && path != '/home') 
    className += ' not-in-home'
  else className += '' 

  return (
    <nav id="navbar" className={className}>
      <ul>
        <CustomLink to="/">Home</CustomLink>
        <CustomLink to="/albums">Albums</CustomLink>
        <CustomLink to="/about">About</CustomLink>
        <CustomLink to="/profile">Profile</CustomLink>
      </ul>
    </nav>
  )
}


function CustomLink ({to, children, ...props}) {
  return (
    <li>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}

export default NavBar 
