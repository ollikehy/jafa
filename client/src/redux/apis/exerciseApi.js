import axios from 'axios'

export const root = '/api/exercise'

export default class loginApi {
  static get() {
    return axios.get(root)
  }
  static add(payload) {
    let config = null
    if (payload.user.token !== null) {
      config = {
        headers: {'Authorization': 'bearer ' + payload.user.token}
      }
    }
    return axios.post(root, payload.exercise, config)
  }
}