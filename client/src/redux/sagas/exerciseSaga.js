import {call, put, takeLatest, delay, select} from 'redux-saga/effects'
import * as actions from '../actions/actions'
import exerciseApi from '../apis/exerciseApi'

function* createExercise({payload}) {
  try {
    const exercise = {
      name: payload.name,
      weight: payload.weight,
      distance: payload.distance,
      timed: payload.timed
    }

    const user = yield select(getCurrentUser)

    const response = yield call(exerciseApi.add, {exercise, user})

    console.log(response)

  } catch (e) {

  }
}

export const watchCreateExercise = takeLatest(actions.createExercise().type, createExercise)

export const getCurrentUser = state => state.loginReducer.loggedIn