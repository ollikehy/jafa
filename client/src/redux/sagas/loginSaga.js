import {call, put, takeLatest, select} from 'redux-saga/effects'
import * as actions from '../actions/actions'
import loginApi from '../apis/loginApi'

function* requestLogin({payload}) {
  try {
    const user = {
      username: payload.username,
      password: payload.password
    }

    const response = yield call(loginApi.add, user)

    if (response.status === 200) {
      const user = {
        token: response.data.token,
        username: response.data.username
      }

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      yield put(actions.loginSuccess(user))
    }
  } catch (e) {
    yield put(actions.loginFailure('Could not login.'))
  }
}

function* requestLogout({payload}) {
  try {
    window.localStorage.clear()

    yield put(actions.logoutSuccess(payload === true))
  } catch (e) {
    yield put(actions.loginFailure('There was an error logging out'))
  }
}

export const watchRequestLogin = takeLatest(actions.login().type, requestLogin)
export const watchRequestLogout = takeLatest(actions.logout().type, requestLogout)
