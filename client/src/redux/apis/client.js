const axios = require('axios')

const url = process.env.NODE_ENV === 'production' ? 'https://jafa-backend.herokuapp.com/' : '/api'
const axiosClient = axios.create({
    baseURL: url
})

export default axiosClient