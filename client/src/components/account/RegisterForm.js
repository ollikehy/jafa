import React, {Component} from 'react'
import {connect} from 'react-redux'
import Message from '../app/Message'

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

  setErrorMessage = () => {
    this.props.registerFailure("Your passwords didn't match")
    setTimeout(() => {this.props.registerErrorReset()}, 10000)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const {username, password, confirmPass} = this.state

    password !== confirmPass ?
      this.setErrorMessage() :
      this.props.register(username, password)

    this.setState({
      username: '',
      password: '',
      confirmPass: ''
    })
  }

  render() {
    const {username, password, confirmPass} = this.state
    const {registerError} = this.props

    return (
      <div className="accountform" >
        {registerError && <Message error={registerError} />}
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
            <button onClick={this.handleSubmit} className='button'>Register</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  registerError: state.registerReducer.registerError
})

const mapDispatchToProps = {
  ...actions
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterForm)