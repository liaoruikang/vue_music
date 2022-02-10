import axios from 'axios'

// 允许跨域 携带 cookie
axios.defaults.withCredentials = true

const request = axios.create({
  baseURL: 'http://localhost:3000/'
})
export default request
