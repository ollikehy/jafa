import {handleActions} from 'redux-actions'
import * as actions from '../actions/actions'

const initialState = {
  registerError: null,
  registerSuccess: null
}

const reducer = handleActions(
  {
    [actions.registerSuccess]: (state, action) => ({
      ...state,
      registerError: null,
      registerSuccess: action.payload
    }),
    [actions.registerFailure]: (state, action) => ({
      ...state,
      registerError: action.payload
    }),
    [actions.registerReducerReset]: (state) => ({
      ...state,
      registerError: null,
      registerSuccess: null
    })
  },
  initialState
)

export default reducer