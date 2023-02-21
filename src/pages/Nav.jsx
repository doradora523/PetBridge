import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <div className='nav'>
      <Link to={'/Anouncement'}><h2>입양하기</h2></Link>
      <Link to={'/Shelter'}><h2>동물보호센터</h2></Link>
    </div>
  )
}

export default Nav