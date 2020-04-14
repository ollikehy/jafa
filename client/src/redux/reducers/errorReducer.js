import {handleActions} from 'redux-actions'
import * as actions from '../actions/actions'

const initialState = {
  errorMessage: null,
  successMessage: null
}

const reducer = handleActions(
  {
    [actions.setSuccessMessage]: (state, action) => ({
      ...state,
      successMessage: action.payload
    }),
    [actions.setErrorMessage]: (state, action) => ({
      ...state,
      errorMessage: action.payload
    }),
    [actions.errorReducerReset]: () => ({
      errorMessage: null,
      successMessage: null
    })
  }, initialState
)

export default reducer