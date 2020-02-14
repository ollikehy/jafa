import React, {useEffect} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Header from './Header'
import App from './App'
import Login from './account/Login'
import Register from './account/Register'

const Routes = () => {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path='/' render={() =>
            <App />} />
          <Route path='/login' render={() =>
            <Login />} />
          <Route path='/register' render={() =>
            <Register />} />
        </Switch>
      </div>
    </Router>
  )
}

export default Routes