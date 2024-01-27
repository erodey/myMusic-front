import React, { useEffect, useState } from 'react'
import "../../styles/AuthenticationPage.css"
import axios from '../../api/axios'
import NavBar from '../NavBar'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import NavBarWrapper from '../NavBarWrapper'

function LoginPage() {

  const {setAuth, persist, setPersist} = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const location = useLocation()
  const navigate = useNavigate()

  const from = location.state?.from?.pathname || '/'

  const handleSubmit = (e) => {
    e.preventDefault()

    const jsonData = {
      username: `${username}`,
      password: `${password}`
    }

    axios.post('/auth/login', jsonData, {
      withCredentials: true
    // })
    // axios({
    //     url: '/api/auth/login',
    //     data: jsonData,
    //     method: 'post'
      }).then((response) => {

        const accessToken = response.data.accessToken
        const roles = response.data.roles
        setAuth({username, accessToken, roles})

        setUsername('')
        setPassword('')
        setErrorMessage('')

        console.log('response: ', response)

        navigate(from, {replace: true})

      }).catch((error) => {

        if(error.response && error.response.status == 401) {
          console.log('status', error.response.status)
          setErrorMessage("Bad credentials!")
        }

      })
  }

  const togglePersist = () => {
    setPersist(prev => !prev)
  }

  useEffect(() => {
    localStorage.setItem('persist', persist)
  }, [persist])

  return (
    <div className='auth-header'>
      <NavBarWrapper />
      {/* <NavBar /> */}
      <form className='centered-text login-form' onSubmit={handleSubmit}>
        <label htmlFor='username'>Username</label>
        <input 
          type="text" 
          name="username"
          autoComplete='off'
          onChange={(e) => setUsername(e.target.value)}
          required={true}
          value={username}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          required={true}
          value={password}
        />
        <div className='persist-check'>
          <input 
            type="checkbox"
            id='persist'
            onChange={togglePersist}
            checked={persist}
          />
          <label htmlFor="persist">Remember me</label>
        </div>
        <button type="submit" onClick={handleSubmit}>Login</button>
        {
          <span>{`${errorMessage}`}</span>
        }
      </form>     
      <p>Don't have an account? <Link to='/register'>Sign In</Link></p>
    </div>
  )
}

export default LoginPage    
