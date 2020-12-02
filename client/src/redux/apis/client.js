const axios = require('axios')

const url = process.env.NODE_ENV === 'production' ? 'http://ec2-13-48-133-5.eu-north-1.compute.amazonaws.com:8000/' : '/api'
const axiosClient = axios.create({
    baseURL: url
})

export default axiosClient