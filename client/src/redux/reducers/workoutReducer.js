import {handleActions} from 'redux-actions'
import * as actions from '../actions/actions'

const initialState = {
  workouts: [],
  workoutError: null,
  workoutSuccess: null
}

const reducer = handleActions(
  {
    [actions.fetchWorkoutsSuccess]: (state, action) => ({
      ...state,
      workouts: action.payload
    })
  }, initialState
)

export default reducer