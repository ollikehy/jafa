import {handleActions} from 'redux-actions'
import * as actions from '../actions/actions'

const initialState = {
  exerciseError: null,
  exerciseSuccess: null,
  exercises: null
}

const reducer = handleActions(
  {
    [actions.createExerciseSuccess]: (state, action) => ({
      ...state,
      exerciseSuccess: action.payload
    }),
    [actions.createExerciseFailure]: (state,action) => ({
      ...state,
      exerciseError: action.payload
    }),
    [actions.exerciseReducerReset]: (state, action) => ({
      ...state,
      exerciseError: null,
      exerciseSuccess: null
    }),
    [actions.fetchExercises]: (state, action) => ({
      ...state,
      exercises: action.payload
    })
  }, initialState
)

export default reducer