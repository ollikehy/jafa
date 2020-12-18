import React from 'react'
import { render } from 'react-dom'
import { applyMiddleware, createStore, combineReducers, compose } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'

import Routes from './components/Routes'

import loginReducer from './redux/reducers/loginReducer'
import userReducer from './redux/reducers/userReducer'
import exerciseReducer from './redux/reducers/exerciseReducer'
import workoutReducer from './redux/reducers/workoutReducer'
import errorReducer from './redux/reducers/errorReducer'

import rootSaga from './redux/sagas/sagas'

import './assets/styles/app.scss'

const sagaMiddleware = createSagaMiddleware()

// eslint-disable-next-line no-undef
const composeEnhancer = (process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

const store = createStore(
  combineReducers({ loginReducer, userReducer, exerciseReducer, workoutReducer, errorReducer }),
  composeEnhancer(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(rootSaga)

render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
)