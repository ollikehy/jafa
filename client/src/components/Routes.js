import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import App from './App'
import Header from './app/Header'
import Login from './account/Login'
import Register from './account/Register'
import ExerciseList from './exercise/ExerciseList'
import ExerciseForm from './exercise/ExerciseForm'
import ExercisePage from './exercise/ExercisePage'
import UserProfile from './user/UserProfile'
import Workout from './workout/Workout'
import Message from './app/Message'

export class Routes extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loggedIn: null
    }
  }

  render() {
    const { loggedIn, messageVisible, errorMessage, successMessage } = this.props

    return (
      <Router>
        <div>
          <Message messageVisible={messageVisible} error={errorMessage} message={successMessage} />
          <Header />
          <Switch>
            <Route exact path='/' render={() =>
              <App />} />
            <Route path='/login'>
              {loggedIn ? <Redirect to='/' /> : <Login />}
            </Route>
            <Route path='/register'>
              {loggedIn ? <Redirect to='/' /> : <Register />}
            </Route>
            <Route path='/profile'>
              {loggedIn ? <UserProfile /> : <Redirect to='/login' />}
            </Route>
            <Route exact path='/exercise'>
              <ExerciseList />
            </Route>
            <Route exact path='/exercise/new'>
              {loggedIn ? <ExerciseForm /> : <Redirect to='/login' />}
            </Route>
            <Route strict path='/exercise/'>
              <ExercisePage />
            </Route>
            <Route path='/workout'>
              {loggedIn ? <Workout /> : <Redirect to='/login' />}
            </Route>
          </Switch>
        </div>
      </Router>
    )
  }
}

Routes.propTypes = {
  loggedIn: PropTypes.object,
  messageVisible: PropTypes.bool,
  successMessage: PropTypes.string,
  errorMessage: PropTypes.string
}

const mapStateToProps = (state) => ({
  loggedIn: state.loginReducer.loggedIn,
  messageVisible: state.errorReducer.messageVisible,
  successMessage: state.errorReducer.successMessage,
  errorMessage: state.errorReducer.errorMessage
})

export default connect(
  mapStateToProps,
  null
)(Routes)