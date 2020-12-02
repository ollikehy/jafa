const axios = require('axios')

console.log(process.env)
const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL ? process.env.REACT_APP_BACKEND_URL : ''
})

export default axiosClient