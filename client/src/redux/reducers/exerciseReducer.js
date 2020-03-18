import {handleActions} from 'redux-actions'
import * as actions from '../actions/actions'

const initialState = {
  exerciseError: '',
  exerciseSuccess: '',
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
    })
  }, initialState
)

export default reducer