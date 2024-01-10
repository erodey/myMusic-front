import React, { useEffect, useState } from 'react'
import "../../styles/AuthenticationPage.css"
import NavBar from '../NavBar'
import { Link, useNavigate } from 'react-router-dom'
import { axiosPrivate } from '../../api/axios'

function RegisterPage() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [responseMessage, setResponseMessage] = useState('')
  const navigate = useNavigate()

  const fetchUsername = (event) => {
    setUsername(event.target.value)
  }

  const fetchPassword = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const jsonData = {
      username: `${username}`,
      password: `${password}`
    }

    axiosPrivate.post('/auth/register', jsonData )
      .then((response) => {
        navigate("/login")
      }).catch((error) => {
        console.log('error: ', error)
        setResponseMessage(error.response.data)
      })
  }


  return (
    <div className='auth-header'>
      <NavBar />
      <form className='centered-text login-form' onSubmit={handleSubmit}>
        <label htmlFor='username'>Username</label>
        <input 
          type="text" 
          name="username"
          onChange={fetchUsername}
          required={true}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          onChange={fetchPassword}
          required={true}
        />
        <button type="submit" onClick={handleSubmit}>Register</button>
        {
          <span>{`${responseMessage}`}</span>
        }
      </form>     
      <p>Already have an account? <Link to='/login'>Log In</Link></p>
    </div>
  )
}

export default RegisterPage 
