import {all} from 'redux-saga/effects'
import * as registerSaga from './registerSaga'
import * as loginSaga from './loginSaga'

export default function* rootSaga() {
  yield all([
    registerSaga.watchRequestRegister,
    loginSaga.watchRequestLogin,
    loginSaga.watchRequestLogout
  ])
}