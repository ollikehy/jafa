import {createAction} from 'redux-actions'

export const register = createAction('REGISTER', (username, password) => ({username, password}))
export const registerSuccess = createAction('REGISTER_SUCCESS')
export const registerFailure = createAction('REGISTER_FAILURE')