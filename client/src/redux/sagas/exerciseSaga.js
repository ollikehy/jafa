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
      yield put(actions.setSuccessMessage(
        `Exercise ${response.data.name} ${msg} succesfully`
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

function* fetchExercises() {
  try {
    const user = yield select(getCurrentUser)
    const response = yield call(exerciseApi.get, user)

    if (response.status === 200) {
      yield put(actions.fetchExercisesSuccess(response.data))
    }
  } catch (e) {
    yield put(actions.setErrorMessage(e.message))
    yield delay(5000)
    yield put(actions.errorReducerReset())
  }
}

function* fetchExercise({payload}) {
  try {
    const response = yield call(exerciseApi.getOne, payload)

    if (response.status === 200) {
      yield put(actions.setExercise(response.data))
    } else if (response.status === 204) {
      throw new Error('Exercise not found')
    }
  } catch (e) {
    yield put(actions.setErrorMessage(e.message))
    yield delay(5000)
    yield put(actions.errorReducerReset())
  }
}

function* updateSuggestedExercise({payload}) {
  try {
    const user = yield select(getCurrentUser)
    const {accepted, name} = payload
    const response = yield call(exerciseApi.modify, {user, accepted, exercise: name})

    if (response.status === 200) {
      yield put(actions.setSuccessMessage(response.data.message))
      yield delay(5000)
      yield put(actions.errorReducerReset())
    }
  } catch (e) {
    yield put(actions.setErrorMessage(e.message))
    yield delay(5000)
    yield put(actions.errorReducerReset())
  }
}

export const watchCreateExercise = takeLatest(actions.createExercise().type, createExercise)
export const watchFetchExercises = takeLatest(actions.fetchExercises().type, fetchExercises)
export const watchFetchExercise = takeLatest(actions.fetchExercise().type, fetchExercise)
export const watchUpdateSuggestedExercise = takeLatest(actions.updateSuggestedExercise().type, updateSuggestedExercise)