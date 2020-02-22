import axios from 'axios'

export const root = '/api/login'

export default class loginApi {
  static get() {
    return axios.get(root)
  }
  static add(payload) {
    return axios.post(root, payload)
  }
}