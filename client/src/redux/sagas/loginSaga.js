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
        username: response.data.username,
        admin: response.data.admin
      }

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      yield put(actions.loginSuccess(user))
      yield put(actions.fetchUser())
    }
  } catch (e) {
    const errorMessage = e.response.data.error

    yield put(actions.setErrorMessage(errorMessage))
    yield delay(5000)
    yield put(actions.errorReducerReset())
  }
}

function* requestLogout({payload}) {
  try {
    window.localStorage.clear()

    yield put(actions.logoutSuccess(payload === true))
    yield put(actions.removeUser())
    yield put(actions.removeWorkouts())
  } catch (e) {
    yield put(actions.logoutFailure('There was an error logging out, try again'))
  }
}

export const watchRequestLogin = takeLatest(actions.login().type, requestLogin)
export const watchRequestLogout = takeLatest(actions.logout().type, requestLogout)

export const getCurrentUser = state => state.loginReducer.loggedIn