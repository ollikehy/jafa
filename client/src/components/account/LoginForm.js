import React, {Component} from 'react'
import {connect} from 'react-redux'

import * as actions from '../../redux/actions/actions'

export class LoginForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      loginError: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const {username, password} = this.state
    this.props.login(username, password)

    this.setState({
      username: '',
      password: ''
    })
  }

  render() {
    const {username, password, loginError} = this.state

    return (
      <div className="login-form">
        <div className="error-message">
          {loginError &&
            <p>{loginError}</p>}
        </div>
        <form>
          <div>
            <input
              id="username"
              name="username"
              className="input-field"
              required value={username}
              onChange={this.handleChange}
              placeholder="Username">
            </input>
          </div>
          <div>
            <input
              id="password"
              name="password"
              className="input-field"
              required value={password}
              onChange={this.handleChange}
              type="password"
              placeholder="Password">
            </input>
          </div>
          <div className="submit-button">
            <button onClick={this.handleSubmit} className="button">Login</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = {
  ...actions
}

export default connect(
  null,
  mapDispatchToProps
)(LoginForm)