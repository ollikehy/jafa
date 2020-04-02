import {call, put, takeLatest, select} from 'redux-saga/effects'
import * as actions from '../actions/actions'
import workoutApi from '../apis/workoutApi'
import {getCurrentUser} from './loginSaga'

function* fetchWorkouts() {
  try {
    const user = yield select(getCurrentUser)
    const response = yield call(workoutApi.get, user)

    if (response.status === 200) {
      yield put(actions.fetchWorkoutsSuccess(response.data))
    }
  } catch (e) {
    console.log(e.message)
  }
}

export const watchFetchWorkouts = takeLatest(actions.fetchWorkouts().type, fetchWorkouts)