import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import DropdownMenu from './DropdownMenu'

import JafaIcon from '../../assets/images/jafa-icon.png'

import * as actions from '../../redux/actions/actions'
import HeaderLinks from './HeaderLinks'

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
          <HeaderLinks
            loggedIn={loggedIn}
            logout={logout}
            className={'header-link'}
            containerClass={'header-menu'} 
            linkContainerClass={'header-linkcontainer'}/>
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