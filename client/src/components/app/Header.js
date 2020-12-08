import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import DropdownMenu from './DropdownMenu'

import JafaIcon from '../../assets/images/jafa-icon.png'

import * as actions from '../../redux/actions/actions'

export class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDesktop: false
    }
    this.updateState = this.updateState.bind(this)
  }

  componentDidMount() {
    this.updateState()
    window.addEventListener('resize', this.updateState)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateState)
  }

  updateState() {
    this.setState({ isDesktop: window.innerWidth > 1000 })
  }

  render() {
    const { loggedIn, logoutError, logout } = this.props

    return (
      <div className='header'>
        <div className='header-title'>
          <Link id='header-icon' className='header-icon-link' to='/'>
            <img className='header-icon' src={JafaIcon}></img>
          </Link>
        </div>
        {logoutError && window.alert(logoutError)}
        {this.state.isDesktop ?
          !loggedIn ? <div className='header-menu'>
            <Link className='header-link' to='/exercise'>Exercises</Link>
            <Link className='header-link' to='/login'>Login</Link>
            <Link className='header-link' to='/register'>Register</Link>
          </div>
            : <div className='header-menu'>
              <Link className='header-link' to='/workout'>Workouts</Link>
              <Link className='header-link' to='/exercise'>Exercises</Link>
              <Link className='header-link' to='/profile'>Profile</Link>
              <div className='header-logout' onClick={logout}>Logout</div>
            </div>
          : <DropdownMenu />}
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