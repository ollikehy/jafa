import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import * as actions from '../redux/actions/actions'

export class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loggedIn: null
    }
  }

  render() {
    const {loggedIn} = this.props

    return (
      <div className='header'>
        <Link className='header-title' to='/'>Just Another Fitness App</Link>
        {!loggedIn && <div>
          <Link className='header-link' to='/login'>Login</Link>
          <Link className='header-link' to='/register'>Register</Link>
        </div>}
        {loggedIn && <div>
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
  loggedIn: state.loginReducer.loggedIn
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)