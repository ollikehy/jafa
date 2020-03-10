import React, {Component} from 'react'
import {connect} from 'react-redux'

export class UserProfile extends Component {

  render() {
    const user = JSON.parse(this.props.loggedIn)
    return (
      <div className='container'>
        <p>Hello {user.username}</p>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.loginReducer.loggedIn
})

export default connect(
  mapStateToProps,
  null
)(UserProfile)