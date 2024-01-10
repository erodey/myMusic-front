import React from 'react'
import NavBar from '../NavBar'

const Unauthorized = () => {
  return (
    <div>
      <NavBar />
      <div className='container centered-content' style={{height: '60vh'}}>
        <h3> You are unauthorized to view this page :( </h3>
      </div>
    </div>
  )
}

export default Unauthorized 
