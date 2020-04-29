import {handleActions} from 'redux-actions'
import * as actions from '../actions/actions'

const initialState = {
  exercises: [],
  exercise: null,
  exerciseHistory: null
}

const reducer = handleActions(
  {
    [actions.fetchExercisesSuccess]: (state, action) => ({
      ...state,
      exercises: action.payload
    }),
    [actions.removeExercises]: () => ({
      exercises: [],
      exercise : null
    }),
    [actions.setExercise]: (state, action) => ({
      ...state,
      exercise: action.payload
    }),
    [actions.setExerciseWithHistory]: (state, action) => ({
      ...state,
      exercise: action.payload.exerciseInfo,
      exerciseHistory: action.payload.exerciseHistory
    })
  }, initialState
)

export default reducer