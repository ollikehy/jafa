import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from '../../redux/actions/actions'

import UserProfileForm from './UserProfileForm'

import Weight from '../../assets/images/weight-50.png'
import Height from '../../assets/images/length-50.png'
import Profile from '../../assets/images/profile-50.png'
import PogTeeth from '../../assets/images/pogteeth.png'

export class UserProfile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showForm: false
    }
  }

  componentDidMount = () => {
    const username = this.props.loggedIn.username
    this.props.fetchUser(username)
  }

  toggleEditForm = (e) => {
    e.preventDefault()
    this.setState({
      showForm: !this.state.showForm
    })
  }

  render() {
    const {user, userFetchError, updateSuccess} = this.props
    const {showForm} = this.state

    return (
      <div className='container'>
        {userFetchError &&
          <p>{userFetchError}</p>}
        {updateSuccess &&
          <p>{updateSuccess}</p>}
        <p className='userprofile-title'>Your profile</p>
        {user &&
          <div className='userprofile-profile'>
            <div className='userprofile-row'>
              {user.admin ? <img src={PogTeeth} /> : <img src={Profile} />}
              <span className='userprofile-text'>
                {user.username}
              </span>
            </div>
            <div className='userprofile-row'>
              <img src={Height}></img>
              <span className='userprofile-text'>
                {user.height ? user.height : 'not defined'}
              </span>
            </div>
            <div className='userprofile-row'>
              <img src={Weight}></img>
              <span className='userprofile-text'>
                {user.weight ? user.weight : 'not defined'}
              </span>
            </div>
          </div>}
        <div>
          <button className='userprofile-button' onClick={this.toggleEditForm}>Edit your information</button>
        </div>
        {showForm &&
          <UserProfileForm />}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.userReducer.user,
  userFetchError: state.userReducer.userFetchError,
  updateSuccess: state.userReducer.updateSuccess,
  loggedIn: state.loginReducer.loggedIn
})

const mapDispatchToProps = {
  ...actions
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile)