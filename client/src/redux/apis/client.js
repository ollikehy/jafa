const axios = require('axios')

console.log(process.env)
const axiosClient = axios.create({
    baseURL: process.env.BACKEND_URL ? process.env.BACKEND_URL : ''
})

export default axiosClient