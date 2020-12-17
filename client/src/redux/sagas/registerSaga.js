import {call, put, takeLatest, delay} from 'redux-saga/effects'
import * as actions from '../actions/actions'
import registerApi from '../apis/registerApi'

function* requestRegister({payload}) {
  try {
    const user = {
      username: payload.username,
      password: payload.password
    }

    const response = yield call(registerApi.add, user)

    if (response.status === 200) {
      const user = {
        token: response.data.token,
        username: response.data.username
      }

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      yield put(actions.setSuccessMessage('Registration succesful!'))
      yield put(actions.loginSuccess(user))
      yield delay(4500)
      yield put(actions.errorReducerReset())
    }
  } catch (e) {
    const errorMessage = (e.response.data.error)
    yield put(actions.setErrorMessage(errorMessage))
    yield delay(4500)
    yield put(actions.errorReducerReset())
  }
}

export const watchRequestRegister = takeLatest(actions.register().type, requestRegister)