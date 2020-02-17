import Vue from 'vue'
import Vuex from 'vuex'
import main from './modules/main'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: null, // 登录用户信息
    menuData: null, // 菜单数据
    addRouterIsComplete: false, // 动态路由是否增加完成
    baseUrl: process.env.NODE_ENV === 'production' ? '' : 'http://localhost:80' // 用于图片请求前缀
  },
  mutations: {
    // 设置登录用户信息
    setUserInfo (state, user) {
      state.userInfo = user
    },
    // 设置菜单数据
    setMenuData (state, menus) {
      state.menuData = menus
    }
  },
  actions: {
    // 获取用户信息
    getUserInfo () {
      return this._vm.$http.post('/user/getUserInfo').then(({ ok, data, msg }) => {
        if (ok && data) {
          this.commit('setUserInfo', data)
        } else {
          return Promise.reject(msg)
        }
      })
    },
    // 获取菜单数据
    getMenuData () {
      return this._vm.$http.post('/api/menu/tree').then(({ ok, data, msg }) => {
        if (ok) {
          this.commit('setMenuData', data)
          return data
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
