import {all} from 'redux-saga/effects'
import * as registerSaga from './registerSaga'
import * as loginSaga from './loginSaga'
import * as userSaga from './userSaga'
import * as exerciseSaga from './exerciseSaga'
import * as workoutSaga from './workoutSaga'

export default function* rootSaga() {
  yield all([
    registerSaga.watchRequestRegister,
    loginSaga.watchRequestLogin,
    loginSaga.watchRequestLogout,
    userSaga.watchFetchUser,
    userSaga.watchUpdateUser,
    exerciseSaga.watchCreateExercise,
    exerciseSaga.watchFetchExercises,
    exerciseSaga.watchFetchExercise,
    exerciseSaga.watchUpdateSuggestedExercise,
    workoutSaga.watchFetchWorkouts,
    workoutSaga.watchCreateWorkout
  ])
}