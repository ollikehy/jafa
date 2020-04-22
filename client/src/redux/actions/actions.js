import {createAction} from 'redux-actions'

/* registerReducer actions */
export const register = createAction('REGISTER', (username, password) => ({username, password}))

/* loginReducer actions */
export const login = createAction('LOGIN', (username, password) => ({username, password}))
export const loginSuccess = createAction('LOGIN_SUCCESS')

export const logout = createAction('LOGOUT')
export const logoutSuccess = createAction('LOGOUT_SUCCESS')
export const logoutFailure = createAction('LOGOUT_FAILURE')

export const loginReducerReset = createAction('LOGIN_REDUCER_RESET')

/* userReducer actions */
export const fetchUser = createAction('FETCH_USER')
export const removeUser = createAction('REMOVE_USER')
export const fetchUserSuccess = createAction('FETCH_USER_SUCCESS')

export const updateUser = createAction('UPDATE_USER', (username, height, weight) => ({username, height, weight}))
export const updateUserSuccess = createAction('UPDATE_USER_SUCCESS')

export const userReducerReset = createAction('USER_REDUCER_RESET')

/* exerciseReducer actions */
export const createExercise = createAction('CREATE_EXERCISE', (name, username, weight, distance, timed) => ({name, username, weight, distance, timed}))

export const fetchExercises = createAction('FETCH_EXERCISES')
export const fetchExercisesSuccess = createAction('FETCH_EXERCISES_SUCCESS')

export const fetchExercise = createAction('FETCH_EXERCISE')
export const setExercise = createAction('SET_EXERCISE')

export const removeExercises = createAction('REMOVE_EXERCISES')

export const updateSuggestedExercise = createAction('UPDATE_SUGGESTED_EXERCISE', (name, accepted) => ({name, accepted}))

/* workoutReducer actions */
export const createWorkout = createAction('CREATE_WORKOUT', (exercises, date) => ({exercises, date}))

export const fetchWorkouts = createAction('FETCH_WORKOUTS')
export const fetchWorkoutsSuccess = createAction('FETCH_WORKOUTS_SUCCESS')

export const removeWorkouts = createAction('REMOVE_WORKOUTS')

/* errorReducer actions */
export const setErrorMessage = createAction('SET_ERROR_MESSAGE')
export const setSuccessMessage = createAction('SET_SUCCESS_MESSAGE')
export const errorReducerReset = createAction('ERROR_REDUCER_RESET')