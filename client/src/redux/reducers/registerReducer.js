import {handleActions} from 'redux-actions'
import * as actions from '../actions/actions'

const initialState = {
  loggedIn: null,
  registerError: null
}

const reducer = handleActions(
  {
    [actions.registerSuccess]: (state, action) => ({
      ...state,
      registerError: null
    }),
    [actions.registerFailure]: (state, action) => ({
      ...state,
      loggedIn: null,
      registerError: action.payload
    })
  },
  initialState
)

export default reducer