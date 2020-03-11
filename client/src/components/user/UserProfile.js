import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from '../../redux/actions/actions'

export class UserProfile extends Component {
  constructor(props) {
    super(props)

    const username = this.props.loggedIn.username
    this.props.fetchUser(username)

    this.state = {
      user: null
    }
  }

  render() {
    const {user} = this.props

    return (
      <div className='container'>
        {user &&
        <p>Hello {user.username}</p>}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.userReducer.user,
  loggedIn: state.loginReducer.loggedIn
})

const mapDispatchToProps = {
  ...actions
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile)