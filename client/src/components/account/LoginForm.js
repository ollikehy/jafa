import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import Message from '../app/Message'
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
    const {username, password} = this.state
    this.props.login(username, password)

    this.setState({
      username: '',
      password: ''
    })
  }

  componentDidMount = () => {
    if (this.props.loginError) {
      this.props.errorReducerReset()
    }
  }

  render() {
    const {username, password} = this.state
    const {loginError} = this.props

    return (
      <div className="accountform">
        {loginError && <Message error={loginError} />}
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
            <button id='loginButton' onClick={this.handleSubmit} className="button">Login</button>
          </div>
        </form>
      </div>
    )
  }
}

LoginForm.propTypes = {
  login: PropTypes.func,
  loginError: PropTypes.string,
  errorReducerReset: PropTypes.func
}

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  loginError: state.errorReducer.errorMessage
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm)