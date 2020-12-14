import {call, put, takeLatest, select, delay} from 'redux-saga/effects'
import * as actions from '../actions/actions'
import workoutApi from '../apis/workoutApi'
import {getCurrentUser} from './loginSaga'

function* fetchWorkouts() {
  try {
    yield put(actions.workoutLoading(true))
    const user = yield select(getCurrentUser)
    const response = yield call(workoutApi.get, user)

    if (response.status === 200) {
      yield put(actions.fetchWorkoutsSuccess(response.data))
    }
  } catch (e) {
    const errorMessage = e.response.data.error

    yield put(actions.setErrorMessage(errorMessage))
    yield put(actions.workoutLoading(false))
    yield delay(5000)
    yield put(actions.errorReducerReset())
  }
}

function* createWorkout({payload}) {
  try {
    const user = yield select(getCurrentUser)

    const {exercises, date} = payload
    const response = yield call(workoutApi.add, {exercises, date, user})

    if (response.status === 200) {
      yield put(actions.setSuccessMessage(
        'New workout created succesfully'
      ))
      yield delay(5000)
      yield put(actions.errorReducerReset())
    }
  } catch (e) {
    const errorMessage = e.response.data.error
    yield put(actions.setErrorMessage(errorMessage))
    yield delay(5000)
    yield put(actions.errorReducerReset())
  }
}


export const watchCreateWorkout = takeLatest(actions.createWorkout().type, createWorkout)
export const watchFetchWorkouts = takeLatest(actions.fetchWorkouts().type, fetchWorkouts)