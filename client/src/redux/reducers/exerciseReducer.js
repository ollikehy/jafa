import {handleActions} from 'redux-actions'
import * as actions from '../actions/actions'

const initialState = {
  exercises: []
}

const reducer = handleActions(
  {
    [actions.fetchExercisesSuccess]: (state, action) => ({
      ...state,
      exercises: action.payload
    }),
    [actions.removeExercises]: () => ({
      exercises: []
    }),
  }, initialState
)

export default reducer