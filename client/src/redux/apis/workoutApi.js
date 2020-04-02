import axios from 'axios'

export const root = '/api/workout'

export default class workoutApi {
  static get(payload) {
    return axios.get(root, {params: {username: payload.username}})
  }
  static add(payload) {
    return axios.post(root, payload)
  }
}