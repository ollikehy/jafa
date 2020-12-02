import axios from './client'

export const root = '/api/workout'

export default class workoutApi {
  static get(payload) {
    let headers = null
    if (payload.token !== null) {
      headers = {'Authorization': 'bearer ' + payload.token}
    }
    return axios.get(root, {params: {username: payload.username}, headers})
  }
  static add(payload) {
    let config = null
    if (payload.user.token !== null) {
      config = {
        headers: {'Authorization': 'bearer ' + payload.user.token}
      }
    }
    return axios.post(root, {
      exercises: payload.exercises,
      date: payload.date,
      username: payload.user.username
    }, config)
  }
}