// 对于数据请求的封装
import axios from 'axios'
import Vue from 'vue'
import { Toast } from 'vant'
Vue.use(Toast)
const http = axios.create({
  baseURL: 'https://m.maizuo.com',
  timeout: 10000,
  headers: {
    'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"1677220826552027851587585","bc":"520400"}'
  }
})
// 在发请求前拦截————showLoading
// Add a request interceptor
http.interceptors.request.use(function (config) {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0
  })
  // Do something before request is sent
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 在成功后拦截————hideLoading
// Add a response interceptor
http.interceptors.response.use(function (response) {
  Toast.clear()
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
}, function (error) {
  Toast.clear()
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})
export default http
