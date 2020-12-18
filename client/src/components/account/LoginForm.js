import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import * as actions from '../../redux/actions/actions'

export class LoginForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { username, password } = this.state
    this.props.login(username, password)

    this.setState({
      username: '',
      password: ''
    })
  }

  render() {
    const { username, password } = this.state

    return (
      <div className="accountform">
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
              type="password"
              placeholder="Password">
            </input>
          </div>
          <div className="submit-button">
            <div id='loginButton' onClick={this.handleSubmit} className="button">Login</div>
            <button style={{ display: 'none' }} onClick={this.handleSubmit}></button>
          </div>
        </form>
      </div>
    )
  }
}

LoginForm.propTypes = {
  login: PropTypes.func,
}

const mapDispatchToProps = {
  ...actions
}

export default connect(
  null,
  mapDispatchToProps
)(LoginForm)