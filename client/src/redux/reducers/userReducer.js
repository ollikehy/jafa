import {handleActions} from 'redux-actions'
import * as actions from '../actions/actions'

const initialState = {
  users: null,
  user: null,
  userFetchError: null
}

const reducer = handleActions(
  {
    [actions.fetchUserSuccess]: (state, action) => ({
      ...state,
      user: action.payload
    }),
    [actions.fetchUserError]: (state, action) => ({
      ...state,
      userFetchError: action.payload
    }),
    [actions.fetchUserErrorReset]: (state, action) => ({
      ...state,
      userFetchError: null
    })
  },
  initialState
)

export default reducer