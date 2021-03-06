import {handleActions} from 'redux-actions'
import * as actions from '../actions/actions'

const initialState = {
  users: null,
  user: null
}

const reducer = handleActions(
  {
    [actions.fetchUserSuccess]: (state, action) => ({
      ...state,
      user: action.payload
    }),
    [actions.removeUser]: (state) => ({
      ...state,
      user: null
    }),
    [actions.updateUserSuccess]: (state, action) => ({
      ...state,
      user: action.payload.user
    }),
    [actions.userReducerReset]: (state) => ({
      ...state,
      updateSuccess: null,
    }),
  },
  initialState
)

export default reducer