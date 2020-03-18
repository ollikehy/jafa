import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import App from './App'
import Header from './app/Header'
import Login from './account/Login'
import Register from './account/Register'
import Exercises from './exercise/Exercises'
import ExerciseForm from './exercise/ExerciseForm'
import UserProfile from './user/UserProfile'

export class Routes extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loggedIn: null
    }
  }

  render() {
    const {loggedIn} = this.props

    return (
      <Router>
        <div>
          <Header />
          <Switch>
            <Route exact path='/' render={() =>
              <App />} />
            <Route path='/login'>
              {loggedIn ? <Redirect to='/' /> : <Login />}
            </Route>
            <Route path='/register' render={() =>
              <Register />} />
            <Route path='/profile'>
              {loggedIn ? <UserProfile /> : <Redirect to='/login' />}
            </Route>
            <Route exact path='/exercise'>
              <Exercises />
            </Route>
            <Route path='/exercise/new'>
              <ExerciseForm />
            </Route>
          </Switch>
        </div>
      </Router>
    )
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.loginReducer.loggedIn
})

export default connect(
  mapStateToProps,
  null
)(Routes)