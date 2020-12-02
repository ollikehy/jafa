const axios = require('axios')


const axiosClient = axios.create({
    baseURL: process.env.BACKEND_URL ? process.env.BACKEND_URL : ''
})

export default axiosClient