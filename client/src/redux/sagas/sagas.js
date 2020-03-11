import {all} from 'redux-saga/effects'
import * as registerSaga from './registerSaga'
import * as loginSaga from './loginSaga'
import * as userSaga from './userSaga'

export default function* rootSaga() {
  yield all([
    registerSaga.watchRequestRegister,
    loginSaga.watchRequestLogin,
    loginSaga.watchRequestLogout,
    userSaga.watchFetchUser
  ])
}