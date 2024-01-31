import React, { useEffect, useState } from 'react'
import '../styles/Header.css'
import useAuth from '../hooks/useAuth'

function Header({topic}) {
  const [title, setTitle] = useState('')
  const [description, setDesciption] = useState('')
  const [style, setStyle] = useState({})
  const {auth} = useAuth()

  useEffect(() => {
    if(topic === "albums"){
      setTitle("Albums")
      setDesciption("All the albums' information is available here")
    } else if(topic === "about"){
      setTitle("Welcome")
      setDesciption("What is this website for?")
    } else if(topic === "profile"){
      setStyle({paddingTop: '0',})
      setTitle(`Hello, ${auth.username}`)
      setDesciption("Here you can see information about your rated albums and songs")
    }

  }, [])

  return (
    <div id="header" className='container' style={style}>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  )
}

export default Header 
