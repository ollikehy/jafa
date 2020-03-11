import React from 'react'
import {render} from 'react-dom'
import {applyMiddleware, createStore, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import createSagaMiddleware from 'redux-saga'

import Routes from './components/Routes'

import registerReducer from './redux/reducers/registerReducer'
import loginReducer from './redux/reducers/loginReducer'
import userReducer from './redux/reducers/userReducer'
import rootSaga from './redux/sagas/sagas'

import './assets/styles/app.css'

const sagaMiddleware = createSagaMiddleware()

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  combineReducers({registerReducer, loginReducer, userReducer}),
  composeEnhancer(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(rootSaga)

render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
)