import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import Header from './Header'
import FrontPage from './FrontPage'
import Login from './account/Login'
import Register from './account/Register'

class Routes extends Component {
  render() {
    return (
      <Router>
        <div className='container'>
          <Header />
          <Switch>
            <Route exact path='/' render={() =>
              <FrontPage />} />
            <Route path='/login' render={() =>
              <Login />} />
            <Route path='/register' render={() =>
              <Register />} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default Routes