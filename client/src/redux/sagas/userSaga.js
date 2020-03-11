import {call, put, takeLatest, delay} from 'redux-saga/effects'
import * as actions from '../actions/actions'
import userApi from '../apis/userApi'

function* fetchUser({payload}) {
  try {
    const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'))

    if (payload.username !== loggedUser.username) {
      yield put(actions.fetchUserError('There was an error fetching user data'))

    } else {
      const response = yield call(userApi.getUser, payload.username)

      if (response.status === 200) {
        const user = response.data.user
        yield put(actions.fetchUserSuccess(user))
      }
    }
  } catch (e) {
    const errorMessage = e.response.data.error

    yield put(actions.fetchUserError(errorMessage))
    yield delay(5000)
    yield put(actions.fetchUserErrorReset())
  }
}

export const watchFetchUser = takeLatest(actions.fetchUser().type, fetchUser)