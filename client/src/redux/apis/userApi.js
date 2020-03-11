import axios from 'axios'

export const root = '/api/user'

export default class userApi {
  static getUser(payload) {
    return axios.get(root, {params: {username: payload}})
  }
  static getUsers() {
    return axios.get(root + '/all')
  }
  static add(payload) {
    return axios.post(root, payload)
  }
}