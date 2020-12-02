import axios from './client'

export const root = '/login'

export default class loginApi {
  static get() {
    return axios.get(root)
  }
  static add(payload) {
    return axios.post(root, payload)
  }
}