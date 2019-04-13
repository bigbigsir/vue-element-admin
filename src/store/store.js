import Vue from 'vue'
import Vuex from 'vuex'
import main from './modules/main'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: null, // 登录用户信息
    addRouterIsComplete: false, // 动态路由是否增加完成
    baseUrl: process.env.NODE_ENV === 'production' ? '' : 'http://127.0.0.1:3000' // 用于图片请求前缀
  },
  mutations: {
    // 设置登录用户信息
    setUserInfo (state, user) {
      state.userInfo = user
    }
  },
  actions: {
    // 获取用户信息
    getUserInfo () {
      return this._vm['$http'].get('/user/getUserInfo').then(({ ok, data, msg }) => {
        if (ok && data) {
          this.commit('setUserInfo', data)
        } else {
          return Promise.reject(msg)
        }
      })
    }
  },
  modules: {
    main
  }
})
