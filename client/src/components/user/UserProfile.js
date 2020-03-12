import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from '../../redux/actions/actions'
import Weight from '../../assets/images/weight-50.png'
import Height from '../../assets/images/length-50.png'
import Profile from '../../assets/images/profile-50.png'
import PogTeeth from '../../assets/images/pogteeth.png'

export class UserProfile extends Component {

  componentDidMount = () => {
    const username = this.props.loggedIn.username
    this.props.fetchUser(username)
  }

  render() {
    const {user} = this.props

    return (
      <div className='container'>
        <p className='userprofile-title'>Your profile</p>
        {user &&
          <div>
            <div className='userprofile-row'>
              {user.admin ? <img src={PogTeeth} /> : <img src={Profile} />}
              <span className='userprofile-text'>{user.username}</span>
            </div>
            <div className='userprofile-row'>
              <img src={Height}></img>
              <span className='userprofile-text'>{user.height}</span>
            </div>
            <div className='userprofile-row'>
              <img src={Weight}></img>
              <span className='userprofile-text'>{user.weight}</span>
            </div>
          </div>}
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