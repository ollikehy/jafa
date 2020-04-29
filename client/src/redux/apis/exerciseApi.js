import axios from 'axios'

export const root = '/api/exercise'

export default class exerciseApi {
  static get(payload) {
    const username = payload ? payload.username : null
    return axios.get(root, {params: {username}})
  }
  static getOne(payload) {
    if (payload.user) {
      return axios.get(root + '/history', {params: {name: payload.exercise, username: payload.user.username}})
    } else {
      return axios.get(root + '/one', {params: {name: payload.exercise}})
    }
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
  static modify(payload) {
    let config = null
    if (payload.user.token !== null) {
      config = {
        headers: {'Authorization': 'bearer ' + payload.user.token}
      }
    }
    const {exercise, accepted} = payload
    return axios.post(root + '/modify', {exercise, accepted}, config)
  }
}