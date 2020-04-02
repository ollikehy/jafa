import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import * as actions from '../../redux/actions/actions'

export class Header extends Component {

  render() {
    const {loggedIn, logoutError, logout} = this.props

    return (
      <div className='header'>
        <div className='header-title'>
          <Link className='header-title-text' to='/'>Just Another Fitness App</Link>
        </div>
        {logoutError && window.alert(logoutError)}
        {!loggedIn && <div className='header-menu'>
          <Link className='header-link' to='/exercise'>Exercises</Link>
          <Link className='header-link' to='/login'>Login</Link>
          <Link className='header-link' to='/register'>Register</Link>
        </div>}
        {loggedIn && <div className='header-menu'>
          <Link className='header-link' to='/workout'>Workouts</Link>
          <Link className='header-link' to='/exercise'>Exercises</Link>
          <Link className='header-link' to='/profile'>Profile</Link>
          <button className='header-logout' onClick={logout}>Logout</button>
        </div>}
      </div>
    )
  }
}

Header.propTypes = {
  loggedIn: PropTypes.object,
  logoutError: PropTypes.string,
  logout: PropTypes.func
}

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  loggedIn: state.loginReducer.loggedIn,
  logoutError: state.loginReducer.logoutError
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)