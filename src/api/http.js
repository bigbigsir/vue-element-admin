/**
 * Created by XiaoJie on 2019/3/12
 */
'use strict'

// import qs from 'qs'
import axios from 'axios'
import cookies from 'js-cookie'
import Router from '../router/router'
import { isIE } from '../util/util'

// 创建 axios 实例
const _http = axios.create({
  timeout: 1000 * 6,
  withCredentials: true,
  baseURL: process.env.NODE_ENV === 'production' ? '' : 'http://127.0.0.1:3000'
})

// 添加请求拦截器
_http.interceptors.request.use(config => {
  if (config.method === 'get' && isIE()) {
    // 给GET 请求后追加时间戳， 解决IE GET 请求缓存问题
    let symbol = ~config.url.indexOf('?') ? '&' : '?'
    config.url += symbol + '_=' + Date.now()
  }
  config.headers.Authorization = cookies.get('token') || null
  return config
}, error => {
  return Promise.reject(error)
})

// 添加响应拦截器
_http.interceptors.response.use(response => {
  return response.data
}, ({ response }) => {
  let info
  if (response.status === 401 && response.data.code === 401) {
    cookies.remove('token')
    return Router.replace({ name: 'login' })
  }
  if (response) {
    info = {
      data: response.data,
      status: response.status,
      statusText: response.statusText
    }
  } else {
    info = {
      status: 5000,
      statusText: 'Network Error'
    }
  }
  console.error(info)
  return Promise.reject(info)
})

// 封装常用请求方法
const http = {
  get (url, params, headers) {
    let options = {}
    if (params) {
      options.params = params
    }
    if (headers) {
      options.headers = headers
    }
    return _http.get(url, options)
  },
  post (url, params, headers) {
    let options = {}
    if (headers) {
      options.headers = headers
    }
    return _http.post(url, params, options)
  },
  put (url, params, headers) {
    let options = {}
    if (headers) {
      options.headers = headers
    }
    return _http.put(url, params, options)
  },
  delete (url, params, headers) {
    let options = {}
    if (params) {
      options.params = params
    }
    if (headers) {
      options.headers = headers
    }
    return _http.delete(url, options)
  }
}

const install = function (Vue) {
  Object.defineProperties(Vue.prototype, {
    $http: {
      get () {
        return http
      },
      enumerable: false, // 不可枚举
      configurable: false // 不可重写
    }
  })
}

export default install
