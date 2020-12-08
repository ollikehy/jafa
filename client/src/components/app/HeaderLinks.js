import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const HeaderLinks = (props) => {
  const { loggedIn, logout, className, containerClass, linkContainerClass } = props

  return (
    !loggedIn ?
      <div className={containerClass}>
        <div className={linkContainerClass}><Link className={className} to='/exercise'>Exercises</Link></div>
        <div className={linkContainerClass}><Link className={className} to='/login'>Login</Link></div>
        <div className={linkContainerClass}><Link className={className} to='/register'>Register</Link></div>
      </div>
      :
      <div className={containerClass}>
        <div className={linkContainerClass}><Link className={className} to='/workout'>Workouts</Link></div>
        <div className={linkContainerClass}><Link className={className} to='/exercise'>Exercises</Link></div>
        <div className={linkContainerClass}><Link className={className} to='/profile'>Profile</Link></div>
        <div className={linkContainerClass}>
          <div className={className} onClick={logout}>Logout</div>
        </div>
      </div>
  )
}

HeaderLinks.propTypes = {
  loggedIn: PropTypes.object,
  logout: PropTypes.func,
  className: PropTypes.string,
  containerClass: PropTypes.string
}

export default HeaderLinks