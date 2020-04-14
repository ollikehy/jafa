import {handleActions} from 'redux-actions'
import * as actions from '../actions/actions'

const initialState = {
  loggedIn: localStorage.loggedUser ? JSON.parse(localStorage.loggedUser) : null,
  logoutError: null
}

const reducer = handleActions(
  {
    [actions.loginSuccess]: (state, action) => ({
      ...state,
      loggedIn: action.payload
    }),
    [actions.logoutSuccess]: (state) => ({
      ...state,
      loggedIn: null,
      logoutError: null
    }),
    [actions.logoutFailure]: (state, action) => ({
      ...state,
      logoutError: action.payload
    }),
    [actions.loginReducerReset]: (state) => ({
      ...state,
      logoutError: null
    }),
  },
  initialState
)

export default reducer