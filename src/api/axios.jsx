import axios from 'axios'

// const BASE_URL = 'http://localhost:8080/api'
const BASE_URL = 'https://mymysic-back-production.up.railway.app/api'

export default axios.create({
  baseURL: BASE_URL,
})

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
})
