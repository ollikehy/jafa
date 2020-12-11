import {handleActions} from 'redux-actions'
import * as actions from '../actions/actions'

const initialState = {
  workouts: [],
  workoutError: null,
  workoutSuccess: null,
  isLoading: false
}

const reducer = handleActions(
  {
    [actions.fetchWorkoutsSuccess]: (state, action) => ({
      ...state,
      isLoading: false,
      workouts: action.payload
    }),
    [actions.removeWorkouts]: () => ({
      workouts: []
    }),
    [actions.workoutLoading]: (state, action) => ({
      ...state,
      isLoading: action.payload
    }),
  }, initialState
)

export default reducer