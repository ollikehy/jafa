import {createAction} from 'redux-actions'

export const register = createAction('REGISTER', (username, password) => ({username, password}))
export const registerSuccess = createAction('REGISTER_SUCCESS')
export const registerFailure = createAction('REGISTER_FAILURE')

export const login = createAction('LOGIN', (username, password) => ({username, password}))
export const loginSuccess = createAction('LOGIN_SUCCESS')
export const loginFailure = createAction('LOGIN_FAILURE')

export const logout = createAction('LOGOUT')
export const logoutSuccess = createAction('LOGOUT_SUCCESS')
export const logoutFailure = createAction('LOGOUT_FAILURE')