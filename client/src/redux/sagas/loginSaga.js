import {call, put, takeLatest, delay} from 'redux-saga/effects'
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
      yield put(actions.fetchUser(user.username))
    }
  } catch (e) {
    const errorMessage = e.response.data.error

    yield put(actions.loginFailure(errorMessage))
    yield delay(5000)
    yield put(actions.loginErrorReset())
  }
}

function* requestLogout({payload}) {
  try {
    window.localStorage.clear()

    yield put(actions.logoutSuccess(payload === true))
    yield put(actions.removeUser())
  } catch (e) {
    yield put(actions.logoutFailure('There was an error logging out, try again'))
  }
}

export const watchRequestLogin = takeLatest(actions.login().type, requestLogin)
export const watchRequestLogout = takeLatest(actions.logout().type, requestLogout)
