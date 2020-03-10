import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import * as actions from '../redux/actions/actions'

export class Header extends Component {

  render() {
    const {loggedIn, logoutError} = this.props

    return (
      <div className='header'>
        <Link className='header-title' to='/'>Just Another Fitness App</Link>
        {logoutError && window.alert(logoutError)}
        {!loggedIn && <div>
          <Link className='header-link' to='/login'>Login</Link>
          <Link className='header-link' to='/register'>Register</Link>
        </div>}
        {loggedIn && <div>
          <Link className='header-link' to='/profile'>Profile</Link>
          <button className='logout-button' onClick={this.props.logout}>Logout</button>
        </div>}
      </div>
    )
  }
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