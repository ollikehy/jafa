import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import * as actions from '../../redux/actions/actions'


export class UserProfileForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      height: '',
      weight: ''
    }
  }

  handleChange = (e) => {
    e.preventDefault()
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { height, weight } = this.state
    const { username } = this.props.user
    this.props.updateUser(username, height, weight)

    this.setState({
      height: '',
      weight: '',
    })
  }

  render() {
    const { height, weight } = this.state

    return (
      <div className="userprofile-form" >
        <form>
          <div>
            <input
              id="height"
              name="height"
              className="userprofile-form-input"
              value={height}
              onChange={this.handleChange}
              type="number"
              placeholder="Height (cm)">
            </input>
          </div>
          <div>
            <input
              id="weight"
              name="weight"
              className="userprofile-form-input"
              value={weight}
              onChange={this.handleChange}
              type="number"
              placeholder="Weight (kg)">
            </input>
          </div>
          <div id='profileSubmit' onClick={this.handleSubmit} className='button'>Update information</div>
        </form>
      </div>
    )
  }
}

UserProfileForm.propTypes = {
  user: PropTypes.object,
  updateUser: PropTypes.func
}

const mapStateToProps = (state) => ({
  user: state.userReducer.user
})

const mapDispatchToProps = {
  ...actions
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfileForm)