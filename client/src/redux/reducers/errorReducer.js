import {handleActions} from 'redux-actions'
import * as actions from '../actions/actions'

const initialState = {
  errorMessage: null,
  successMessage: null,
  messageVisible: false
}

const reducer = handleActions(
  {
    [actions.setSuccessMessage]: (state, action) => ({
      ...state,
      successMessage: action.payload,
      messageVisible: true
    }),
    [actions.setErrorMessage]: (state, action) => ({
      ...state,
      errorMessage: action.payload,
      messageVisible: true
    }),
    [actions.errorReducerReset]: () => ({
      errorMessage: null,
      successMessage: null,
      messageVisible: false
    }),
    [actions.hideMessage]: () => ({
      messageVisible: false
    })
  }, initialState
)

export default reducer