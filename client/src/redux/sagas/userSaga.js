import { call, put, takeLatest, delay, select } from 'redux-saga/effects'
import * as actions from '../actions/actions'
import userApi from '../apis/userApi'
import { getCurrentUser } from './loginSaga'

function* fetchUser() {
  try {
    const user = yield select(getCurrentUser)
    const response = yield call(userApi.getUser, user)

    if (response.status === 200) {
      const user = response.data.user
      yield put(actions.fetchUserSuccess(user))
    }
  } catch (e) {
    const errorMessage = e.response.data.error

    yield put(actions.setErrorMessage(errorMessage))
    yield delay(4500)
    yield put(actions.errorReducerReset())
  }
}

function* updateUser({ payload }) {
  try {
    const loggedUser = yield select(getCurrentUser)

    const user = {
      username: payload.username,
      height: payload.height,
      weight: payload.weight
    }

    const response = yield call(userApi.add, { user, loggedUser })

    if (response.status === 200) {
      yield put(actions.updateUserSuccess({
        user: response.data.user,
      }))
      yield put(actions.setSuccessMessage('User updated succesfully'))
      yield delay(4500)
      yield put(actions.userReducerReset())
      yield put(actions.errorReducerReset())
    }

  } catch (e) {
    const errorMessage = (e.response.data.error)
    yield put(actions.setErrorMessage(errorMessage))
    yield delay(4500)
    yield put(actions.errorReducerReset())
  }
}

export const watchFetchUser = takeLatest(actions.fetchUser().type, fetchUser)
export const watchUpdateUser = takeLatest(actions.updateUser().type, updateUser)