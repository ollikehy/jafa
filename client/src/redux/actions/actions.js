import {createAction} from 'redux-actions'

/* registerReducer actions */
export const register = createAction('REGISTER', (username, password) => ({username, password}))
export const registerSuccess = createAction('REGISTER_SUCCESS')
export const registerFailure = createAction('REGISTER_FAILURE')

export const registerReducerReset = createAction('REGISTER_REDUCER_RESET')

/* loginReducer actions */
export const login = createAction('LOGIN', (username, password) => ({username, password}))
export const loginSuccess = createAction('LOGIN_SUCCESS')
export const loginFailure = createAction('LOGIN_FAILURE')

export const logout = createAction('LOGOUT')
export const logoutSuccess = createAction('LOGOUT_SUCCESS')
export const logoutFailure = createAction('LOGOUT_FAILURE')

export const loginReducerReset = createAction('LOGIN_REDUCER_RESET')

/* userReducer actions */
export const fetchUser = createAction('FETCH_USER')
export const removeUser = createAction('REMOVE_USER')
export const fetchUserSuccess = createAction('FETCH_USER_SUCCESS')
export const fetchUserFailure = createAction('FETCH_USER_ERROR')

export const updateUser = createAction('UPDATE_USER', (username, height, weight) => ({username, height, weight}))
export const updateUserSuccess = createAction('UPDATE_USER_SUCCESS')
export const updateUserFailure = createAction('UPDATE_USER_FAILURE')

export const userReducerReset = createAction('USER_REDUCER_RESET')

/* exerciseReducer actions */
export const createExercise = createAction('CREATE_EXERCISE', (name, username, weight, distance, timed) => ({name, username, weight, distance, timed}))
export const createExerciseSuccess = createAction('CREATE_EXERCISE_SUCCESS')
export const createExerciseFailure = createAction('CREATE_EXERCISE_FAILURE')

export const fetchExercises = createAction('FETCH_EXERCISES')
export const fetchExercisesSuccess = createAction('FETCH_EXERCISES_SUCCESS')

export const exerciseReducerReset = createAction('EXERCISE_REDUCER_RESET')
