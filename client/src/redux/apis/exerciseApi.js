import axios from 'axios'

export const root = '/api/exercise'

export default class exerciseApi {
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
    return axios.post(root, payload.exercise, config)
  }
}