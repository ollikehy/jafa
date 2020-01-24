import React from 'react'
import {Link} from 'react-router-dom'

const Header = () => {

  return (
    <div className='header'>
      <p className='header-title'>Just Another Fitness App</p>
      <Link className='header-link' to='/login'>Login</Link>
      <Link className='header-link' to='/register'>Register</Link>
    </div>
  )
}

export default Header