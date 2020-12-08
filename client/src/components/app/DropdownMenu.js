import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import enhanceWithClickOutside from 'react-click-outside'

import Hamburger from '../../assets/images/hamburger.png'

import * as actions from '../../redux/actions/actions'

export class DropdownMenu extends Component {
  constructor(props) {
    super(props)

    this.state = {
      listOpen: false
    }
  }

  handleClickOutside = () => {
    this.setState({
      listOpen: false
    })
  }

  toggleList = () => {
    this.setState({
      listOpen: !this.state.listOpen
    })
  }

  render() {
    const { listOpen } = this.state
    const { loggedIn, logout } = this.props

    return (
      <div>
        <div className='dropdown-header' onClick={this.toggleList}>
          <img style={{ width: 40, height: 40 }} src={Hamburger}></img>
        </div>
        {listOpen && (
          !loggedIn ? <div className='dropdown-content'>
            <Link className='dropdown-item' to='/exercise'>Exercises</Link>
            <Link className='dropdown-item' to='/login'>Login</Link>
            <Link className='dropdown-item' to='/register'>Register</Link>
          </div>
            : <div className='dropdown-content'>
              <Link className='dropdown-item' to='/workout'>Workouts</Link>
              <Link className='dropdown-item' to='/exercise'>Exercises</Link>
              <Link className='dropdown-item' to='/profile'>Profile</Link>
              <div className='dropdown-item' onClick={logout}>Logout</div>
            </div>)
        }
      </div>
    )
  }
}

DropdownMenu.propTypes = {
  loggedIn: PropTypes.object,
  logout: PropTypes.func
}

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  loggedIn: state.loginReducer.loggedIn,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(enhanceWithClickOutside(DropdownMenu))