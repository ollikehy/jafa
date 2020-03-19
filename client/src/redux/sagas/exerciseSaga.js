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
      accepted: user.admin
    }

    const response = yield call(exerciseApi.add, {exercise, user})

    if (response.status === 200) {
      yield put(actions.createExerciseSuccess(`Exercise ${response.data.name} created succesfully`))
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

export const watchCreateExercise = takeLatest(actions.createExercise().type, createExercise)