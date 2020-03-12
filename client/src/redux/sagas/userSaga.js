import {call, put, takeLatest, delay} from 'redux-saga/effects'
import * as actions from '../actions/actions'
import userApi from '../apis/userApi'

function* fetchUser({payload}) {
  try {
    const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'))

    if (payload.username !== loggedUser.username) {
      yield put(actions.fetchUserFailure('There was an error fetching user data'))

    } else {
      const response = yield call(userApi.getUser, payload.username)

      if (response.status === 200) {
        const user = response.data.user
        yield put(actions.fetchUserSuccess(user))
      }
    }
  } catch (e) {
    const errorMessage = e.response.data.error

    yield put(actions.fetchUserFailure(errorMessage))
    yield delay(5000)
    yield put(actions.userErrorReset())
  }
}

function* updateUser({payload}) {
  try {
    const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'))

    if (payload.username !== loggedUser.username) {
      yield put(actions.updateUserFailure('There was an error updating user information'))

    } else {
      const user = {
        username: payload.username,
        height: payload.height,
        weight: payload.weight
      }

      const response = yield call(userApi.add, user)

      if (response.status === 200) {
        yield put(actions.updateUserSuccess({
          user: response.data.user,
          message: response.data.message
        }))
        yield delay(5000)
        yield put(actions.userErrorReset())
      }
    }
  } catch (e) {
    const errorMessage = (e.response.data.error)
    yield put(actions.updateUserFailure(errorMessage))
    yield delay(5000)
    yield put(actions.userErrorReset())
  }
}

export const watchFetchUser = takeLatest(actions.fetchUser().type, fetchUser)
export const watchUpdateUser = takeLatest(actions.updateUser().type, updateUser)