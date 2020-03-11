import {handleActions} from 'redux-actions'
import * as actions from '../actions/actions'

const initialState = {
  loggedIn: localStorage.loggedUser ? JSON.parse(localStorage.loggedUser) : null,
  loginError: null,
  logoutError: null
}

const reducer = handleActions(
  {
    [actions.loginSuccess]: (state, action) => ({
      ...state,
      loggedIn: action.payload,
      loginError: null
    }),
    [actions.loginFailure]: (state, action) => ({
      ...state,
      loginError: action.payload
    }),
    [actions.loginErrorReset]: (state, action) => ({
      ...state,
      loginError: null,
      logoutError: null
    }),
    [actions.logoutSuccess]: (state, action) => ({
      ...state,
      loggedIn: null,
      logoutError: null
    }),
    [actions.logoutFailure]: (state, action) => ({
      ...state,
      logoutError: action.payload
    })
  },
  initialState
)

export default reducer