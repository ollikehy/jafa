import axios from 'axios'

export const root = '/api/register'

export default class registerApi {
  static get() {
    return axios.get(root)
  }
  static add(payload) {
    return axios.post(root, payload)
  }
}