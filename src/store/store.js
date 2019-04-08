import Vue from 'vue'
import Vuex from 'vuex'
import main from './modules/main'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseUrl: process.env.NODE_ENV === 'production' ? '' : 'http://127.0.0.1:3000' // 用于图片请求前缀
  },
  mutations: {},
  actions: {},
  modules: {
    main
  }
})
