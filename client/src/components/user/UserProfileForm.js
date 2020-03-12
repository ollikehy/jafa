import React, {Component} from 'react'
import {connect} from 'react-redux'

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
    const {height, weight} = this.state
    const {username} = this.props.user
    this.props.updateUser(username, height, weight)

    this.setState({
      height: '',
      weight: '',
    })
  }

  render() {
    const {updateFailure} = this.props
    const {height, weight} = this.state

    return (
      <div className="userprofile-form" >
        <div className="error-message">
          {updateFailure &&
            <p>{updateFailure}</p>}
        </div>
        <form>
          <div>
            <input
              id="height"
              name="height"
              className="input-field"
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
              className="input-field"
              value={weight}
              onChange={this.handleChange}
              type="number"
              placeholder="Weight (kg)">
            </input>
          </div>

          <div className='submit-button'>
            <button onClick={this.handleSubmit} className='button'>Update information</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.userReducer.user,
  updateFailure: state.userReducer.updateFailure
})

const mapDispatchToProps = {
  ...actions
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfileForm)