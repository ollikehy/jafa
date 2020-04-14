import axios from 'axios'

export const root = '/api/workout'

export default class workoutApi {
  static get(payload) {
    return axios.get(root, {params: {username: payload.username}})
  }
  static add(payload) {
    let config = null
    if (payload.user.token !== null) {
      config = {
        headers: {'Authorization': 'bearer ' + payload.user.token}
      }
    }
    return axios.post(root, payload.exercises, config)
  }
}