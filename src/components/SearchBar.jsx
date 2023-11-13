import React, { useEffect, useState } from 'react'
import '../styles/SearchBar.css'
import { Link, useNavigate } from 'react-router-dom'

function SearchBar({placeHolder, toAlt, topic}) {

  const [text, setText] = useState('')
  const [isDisabled, setIsDisabled] = useState(true)
  const navigate = useNavigate()

  const fetchText = (event) => {
    if(event.target.value !== ''){
      setIsDisabled(false)
      setText(event.target.value)
    } else {
      setIsDisabled(true)
    } 
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('text: ', text)
    if(text === "") {
      return false
    }
    navigate(`/albums/s${toAlt ? 'еа' : 'ea' }rch/${text}`, { state: {text: `${text}` } })
  }

  const showAll = (e) => {
    if(topic === "albums"){
      navigate("/albums")
    } else if(topic === "songs") {
      navigate("/songs")
    }
  }

  return (
    <div>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
      <form className='searchBar container' onSubmit={handleSubmit}>
        <button className='searchBtn' type="button" onClick={showAll}>Show All</button>
        <input 
          type="text" 
          placeholder={` ${placeHolder}`}
          name='search'
          onChange={fetchText}
          required={true}
        />
        <button className='searchBtn' type="submit">
          {
            isDisabled ? <span><i className="fa fa-search"></i></span>
              : <Link to={`/albums/s${toAlt ? 'еа' : 'ea' }rch/${text}`} state={ {text: `${text}` }}>
                  <i className="fa fa-search"></i>
                </Link>
          }
        </button>
      </form>
    </div>
  )
}

export default SearchBar    
