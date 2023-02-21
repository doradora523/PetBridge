import React from 'react'
import { Link } from 'react-router-dom'
import Nav from './Nav'

const Header = () => {
  return (
    <div className='header'>
      <Link to="/">
        <h1 className='logo'>PET SHELTER</h1>
      </Link>
      <Nav />
    </div>
  )
}

export default Header