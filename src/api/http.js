/**
 * Created by bigBigSir on 2019/3/12
 */
'use strict'

// import qs from 'qs'
import axios from 'axios'
import cookies from 'js-cookie'
import Router from '../router/router'
import { isIE } from '../utils/util'

// 创建 axios 实例
const _http = axios.create({
  timeout: 1000 * 30,
  withCredentials: true,
  baseURL: process.env.NODE_ENV === 'production' ? '' : 'http://localhost:80'
})

// // 设置 post、put 默认 Content-Type
// _http.defaults.headers.post['Content-Type'] = 'application/json'
// _http.defaults.headers.put['Content-Type'] = 'application/json'

// 添加请求拦截器
_http.interceptors.request.use(config => {
  // if (config.method === 'post' || config.method === 'put') {
  //   // post、put 提交时，将对象转换为string, 为处理Java后台解析问题
  //   config.data = JSON.stringify(config.data)
  // }
  if (config.method === 'get' && isIE()) {
    // 给GET 请求后追加时间戳， 解决IE GET 请求缓存问题
    const symbol = ~config.url.indexOf('?') ? '&' : '?'
    config.url += symbol + '_=' + Date.now()
  }
  config.headers['Accept-Language'] = localStorage.getItem('language') || 'zh-CN'
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
  if (!response || (response.status === 401 && response.data.code === 401)) {
    cookies.remove('token')
    Router.replace({ name: 'login' })
  }
  console.error(info)
  return Promise.reject(info.statusText)
})

// 封装常用请求方法
const http = {
  get (url, params, headers) {
    const options = {}
    if (params) {
      options.params = params
    }
    if (headers) {
      options.headers = headers
    }
    return _http.get(url, options)
  },
  post (url, params, headers) {
    const options = {}
    if (headers) {
      options.headers = headers
    }
    return _http.post(url, params, options)
  },
  put (url, params, headers) {
    const options = {}
    if (headers) {
      options.headers = headers
    }
    return _http.put(url, params, options)
  },
  delete (url, params, headers) {
    const options = {}
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
