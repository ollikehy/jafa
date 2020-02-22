import React from 'react'
import {render} from 'react-dom'
import {applyMiddleware, createStore, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import createSagaMiddleware from 'redux-saga'

import Routes from './components/Routes'

import registerReducer from './redux/reducers/registerReducer'
import loginReducer from './redux/reducers/loginReducer'
import rootSaga from './redux/sagas/sagas'

import './assets/styles/app.css'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  combineReducers({registerReducer, loginReducer}),
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga)

render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
)