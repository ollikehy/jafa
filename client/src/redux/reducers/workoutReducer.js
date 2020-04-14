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
    }),
    [actions.createWorkoutSuccess]: (state, action) => ({
      ...state,
      workoutSuccess: action.payload
    }),
    [actions.createWorkoutFailure]: (state, action) => ({
      ...state,
      workoutError: action.payload
    }),
    [actions.workoutReducerReset]: (state, action) => ({
      ...state,
      workoutError: null,
      workoutSuccess: null
    })
  }, initialState
)

export default reducer