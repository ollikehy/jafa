import {call, put, takeLatest, select, delay} from 'redux-saga/effects'
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

function* createWorkout({payload}) {
  try {
    const user = yield select(getCurrentUser)

    const {exercises, date} = payload
    const response = yield call(workoutApi.add, {exercises, date, user})

    if (response.status === 200) {
      yield put(actions.createWorkoutSuccess(
        'New workout created succesfully'
      ))
      yield delay(5000)
      yield put(actions.workoutReducerReset())
    }
  } catch (e) {
    const errorMessage = e.response.data.error

    yield put(actions.createWorkoutFailure(errorMessage))
    yield delay(5000)
    yield put(actions.workoutReducerReset())
  }
}


export const watchCreateWorkout = takeLatest(actions.createWorkout().type, createWorkout)
export const watchFetchWorkouts = takeLatest(actions.fetchWorkouts().type, fetchWorkouts)