import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions/actions'
import PropTypes from 'prop-types'

import UserProfileForm from './UserProfileForm'

import Weight from '../../assets/images/weight-50.png'
import Height from '../../assets/images/length-50.png'
import Profile from '../../assets/images/profile-50.png'
import BMI from '../../assets/images/bmi-50.png'
import Spinner from '../app/Spinner'

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
    const { user } = this.props
    const { showForm } = this.state

    return (
      <div className='container'>
        <p className='userprofile-title'>Your profile</p>
        {user ?
          <div className='userprofile-profile'>
            <div className='userprofile-row'>
              <img className='userprofile-icon' src={Profile} />
              <span className='userprofile-text'>
                {user.username}
              </span>
            </div>
            <div className='userprofile-row'>
              <img className='userprofile-icon' src={Height}></img>
              <span className='userprofile-text'>
                {user.height ? user.height + ' cm' : 'not defined'}
              </span>
            </div>
            <div className='userprofile-row'>
              <img className='userprofile-icon' src={Weight}></img>
              <span className='userprofile-text'>
                {user.weight ? user.weight + ' kg' : 'not defined'}
              </span>
            </div>
            {user.weight && user.height &&
              <div className='userprofile-row'>
                <img className='userprofile-icon' src={BMI}></img>
                <span className='userprofile-text'>
                  {(user.weight / Math.pow(user.height / 100, 2)).toFixed(2)}
                </span>
              </div>}
          </div> :
          <Spinner />
        }
        <div className='userprofile-button-container'>
          <div className='userprofile-button' onClick={this.toggleEditForm}>Edit your information</div>
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
  updateSuccess: PropTypes.string
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