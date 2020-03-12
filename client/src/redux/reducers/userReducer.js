import {handleActions} from 'redux-actions'
import * as actions from '../actions/actions'

const initialState = {
  users: null,
  user: null,
  userFetchError: null,
  updateSuccess: null,
  updateFailure: null
}

const reducer = handleActions(
  {
    [actions.fetchUserSuccess]: (state, action) => ({
      ...state,
      user: action.payload
    }),
    [actions.fetchUserFailure]: (state, action) => ({
      ...state,
      userFetchError: action.payload
    }),
    [actions.userErrorReset]: (state, action) => ({
      ...state,
      userFetchError: null,
      updateSuccess: null,
      updateFailure: null
    }),
    [actions.updateUserSuccess]: (state, action) => ({
      ...state,
      user: action.payload.user,
      updateSuccess: action.payload.message
    }),
    [actions.updateUserFailure]: (state, action) => ({
      ...state,
      updateFailure: action.payload
    }),
  },
  initialState
)

export default reducer