import {call, put, takeLatest, delay, select} from 'redux-saga/effects'
import * as actions from '../actions/actions'
import exerciseApi from '../apis/exerciseApi'
import {getCurrentUser} from './loginSaga'

function* createExercise({payload}) {
  try {
    const user = yield select(getCurrentUser)

    const exercise = {
      name: payload.name,
      weightExercise: payload.weight,
      distanceExercise: payload.distance,
      timedExercise: payload.timed,
      accepted: user.admin ? true : false
    }

    const response = yield call(exerciseApi.add, {exercise, user})

    if (response.status === 200) {
      const msg = user.admin ? 'added' : 'suggested'
      yield put(actions.createExerciseSuccess(
        `Exercise ${response.data.name} ${msg} succesfully`
      ))
      yield delay(5000)
      yield put(actions.exerciseReducerReset())
    }
  } catch (e) {
    const errorMessage = e.response.data.error

    yield put(actions.createExerciseFailure(errorMessage))
    yield delay(5000)
    yield put(actions.exerciseReducerReset())

  }
}

function* fetchExercises() {
  try {
    const user = yield select(getCurrentUser)
    const response = yield call(exerciseApi.get, user)

    if (response.status === 200) {
      yield put(actions.fetchExercisesSuccess(response.data))
    }
  } catch (e) {
    console.log(e.message)
  }
}

export const watchCreateExercise = takeLatest(actions.createExercise().type, createExercise)
export const watchFetchExercises = takeLatest(actions.fetchExercises().type, fetchExercises)