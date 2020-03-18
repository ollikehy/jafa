import {createAction} from 'redux-actions'

export const register = createAction('REGISTER', (username, password) => ({username, password}))
export const registerSuccess = createAction('REGISTER_SUCCESS')
export const registerFailure = createAction('REGISTER_FAILURE')
export const registerErrorReset = createAction('REGISTER_ERROR_RESET')

export const login = createAction('LOGIN', (username, password) => ({username, password}))
export const loginSuccess = createAction('LOGIN_SUCCESS')
export const loginFailure = createAction('LOGIN_FAILURE')
export const loginErrorReset = createAction('LOGIN_ERROR_RESET')

export const logout = createAction('LOGOUT')
export const logoutSuccess = createAction('LOGOUT_SUCCESS')
export const logoutFailure = createAction('LOGOUT_FAILURE')

export const fetchUser = createAction('FETCH_USER', (username) => ({username}))
export const removeUser = createAction('REMOVE_USER')
export const fetchUserSuccess = createAction('FETCH_USER_SUCCESS')
export const fetchUserFailure = createAction('FETCH_USER_ERROR')
export const userErrorReset = createAction('USER_ERROR_RESET')

export const updateUser = createAction('UPDATE_USER', (username, height, weight) => ({username, height, weight}))
export const updateUserSuccess = createAction('UPDATE_USER_SUCCESS')
export const updateUserFailure = createAction('UPDATE_USER_FAILURE')

export const createExercise = createAction('CREATE_EXERCISE', (name, username, weight, distance, timed) => ({name, username, weight, distance, timed}))
export const createExerciseSuccess = createAction('CREATE_EXERCISE_SUCCESS')
export const createExerciseFailure = createAction('CREATE_EXERCISE_FAILURE')