import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from '../../redux/actions/actions'
import PropTypes from 'prop-types'

import UserProfileForm from './UserProfileForm'
import Message from '../app/Message'

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
    if (!this.props.user) this.props.fetchUser()
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
        {(updateSuccess || userFetchError) && <Message error={userFetchError} message={updateSuccess} />}
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
            {user.weight && user.height &&
              <div className='userprofile-row'>
                <span className='userprofile-text'>
                  {(user.weight / Math.pow(user.height / 100, 2)).toFixed(2)}
                </span>
              </div>}
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

UserProfile.propTypes = {
  user: PropTypes.object,
  fetchUser: PropTypes.func,
  userFetchError: PropTypes.string,
  updateSuccess: PropTypes.string
}

const mapStateToProps = (state) => ({
  user: state.userReducer.user,
  userFetchError: state.errorReducer.errorMessage,
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