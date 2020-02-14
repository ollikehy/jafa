import {call, put, takeLatest, select} from 'redux-saga/effects'
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
      yield put(actions.registerSuccess(user))
    }
  } catch (e) {
    yield put(actions.registerFailure('Could not register.'))
  }
}

export const watchRequestRegister = takeLatest(actions.register().type, requestRegister)