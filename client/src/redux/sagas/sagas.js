import {all} from 'redux-saga/effects'
import * as registerSaga from './registerSaga'

export default function* rootSaga() {
  yield all([
    registerSaga.watchRequestRegister
  ])
}