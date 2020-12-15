import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import * as actions from '../../redux/actions/actions'

export class RegisterForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      confirmPass: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  setPasswordError = () => {
    this.props.setErrorMessage('Your passwords did not match')
    setTimeout(() => {this.props.errorReducerReset()}, 5000)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const {username, password, confirmPass} = this.state

    password !== confirmPass ?
      this.setPasswordError() :
      this.props.register(username, password)

    this.setState({
      username: '',
      password: '',
      confirmPass: ''
    })
  }

  render() {
    const {username, password, confirmPass} = this.state

    return (
      <div className="accountform" >
        <form>
          <div>
            <input
              id="username"
              name="username"
              className="accountform-input"
              required value={username}
              onChange={this.handleChange}
              placeholder="Username">
            </input>
          </div>
          <div>
            <input
              id="password"
              name="password"
              className="accountform-input"
              required value={password}
              onChange={this.handleChange}
              placeholder="Password"
              type="password">
            </input>
          </div>
          <div>
            <input
              id="confirmPass"
              name="confirmpass"
              className="accountform-input"
              required value={confirmPass}
              onChange={this.handleChange}
              placeholder="Confirm password"
              type="password">
            </input>
          </div>
          <div className='submit-button'>
            <div id='registerButton' onClick={this.handleSubmit} className='button'>Register</div>
          </div>
        </form>
      </div>
    )
  }
}

RegisterForm.propTypes = {
  setErrorMessage: PropTypes.func,
  errorReducerReset: PropTypes.func,
  register: PropTypes.func,
  registerError: PropTypes.string
}

const mapDispatchToProps = {
  ...actions
}

export default connect(
  null,
  mapDispatchToProps
)(RegisterForm)