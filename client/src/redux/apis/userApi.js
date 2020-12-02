import axios from './client'

export const root = '/api/user'

export default class userApi {
  static getUser(payload) {
    let headers = null
    if (payload.token !== null) {
      headers = {'Authorization': 'bearer ' + payload.token}
    }
    return axios.get(root, {params: {username: payload.username}, headers})
  }
  static getUsers() {
    return axios.get(root + '/all')
  }
  static add(payload) {
    let config = null
    if (payload.loggedUser.token !== null) {
      config = {
        headers: {'Authorization': 'bearer ' + payload.loggedUser.token}
      }
    }
    return axios.post(root, payload.user, config)
  }
}