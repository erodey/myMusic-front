import React, { useEffect, useState } from 'react'
import "../../styles/AuthenticationPage.css"
import NavBar from '../NavBar'
import { Link, useNavigate } from 'react-router-dom'
import { axiosPrivate } from '../../api/axios'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NavBarWrapper from '../NavBarWrapper'

function RegisterPage() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [confirmTried, setConfirmTried] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [errorClass, setErrorClass] = useState('hidden')
  const [responseMessage, setResponseMessage] = useState('')
  const navigate = useNavigate()
  // const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
  // const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  const fetchUsername = (event) => {
    setUsername(event.target.value)
  }

  const fetchPassword = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if(password != confirm){
      setErrorClass('')
      setErrorMessage("Confirm your password")
    } else {
      setErrorClass('hidden')
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

  }


  return (
    <div className='auth-header'>
      <NavBarWrapper />
      <div style={{position: 'relative'}}>
        <div className="register-error" >
          {
            confirmTried && password != confirm ? <div className={errorClass}> 
              <FontAwesomeIcon icon={faCircleExclamation} style={{color: 'black', fontSize: '1.3rem'}}/>
              {" Confirm your password"}
            </div> : <></>
          }
        </div>
        <form className='centered-text login-form' onSubmit={handleSubmit}>
          <label htmlFor='username'>Username</label>
          <input 
            type="text" 
            name="username"
            onChange={fetchUsername}
            required={true}
            pattern='^[A-z][A-z0-9-_]{3,23}$'
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            onChange={fetchPassword}
            required={true}
            pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$'
            onFocus={() => setErrorClass('hidden')}
          />
          <label htmlFor="password">Confirm password</label>
          <input
            type="password"
            name="confirm"
            onChange={(e) => setConfirm(e.target.value)}
            required={true}
            onFocus={() => setErrorClass('hidden')}
            onBlur={() => setConfirmTried(true)}
          />
          <button type="submit">Register</button>
          {
            <span style={{paddingBottom: '2rem'}}>{`${responseMessage}`}</span>
          }
        </form>     
      </div>
      <p>Already have an account? <Link to='/login'>Log In</Link></p>
      <div className="register-info centered-text ">
        <div className="username-info">
          <FontAwesomeIcon icon={faCircleExclamation} style={{color: 'black', fontSize: '1.3rem'}}/>
          {" Username."} <br />
          4 to 24 characters.<br />
          Must begin with a letter.<br />
          Letters, numbers, underscores, hyphens allowed. 
        </div>
        <div className="password-info">
          <FontAwesomeIcon icon={faCircleExclamation} style={{color: 'black', fontSize: '1.3rem'}}/>
          {" Password."} <br />
          8 to 24 characters.<br />
          Must include uppercase and lowercase letters, a number and a special character.<br />
          Allowed special characters: ! @ # $ %
        </div>
      </div>
    </div>
  )
}

export default RegisterPage 
