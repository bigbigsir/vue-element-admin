import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tabs: [{
      id: null,
      path: '/home',
      name: 'sys_home',
      label: '首页',
      icon: 'home',
      openMode: 'tab',
      params: {},
      query: {}
    }],
    tabsActiveName: null,
    menuData: null,
    menuActiveIndex: null,
    isAddRouterComplete: false,
    userInfo: null,
    isCollapse: false,
    tabRouterKey: 0,
    headerFollowTheme: localStorage.getItem('header') !== 'false',
    sideMenuDarkSkin: localStorage.getItem('sideMenu') !== 'false',
    size: localStorage.getItem('size') || 'medium',
    baseUrl: process.env.NODE_ENV === 'production' ? '' : 'http://127.0.0.1:3000'
  },
  mutations: {
    toggleCollapse (state, val) {
      state.isCollapse = val
    },
    toggleHeaderSkin (state, val) {
      state.headerFollowTheme = val
      localStorage.setItem('header', val)
    },
    toggleSideMenuSkin (state, val) {
      state.sideMenuDarkSkin = val
      localStorage.setItem('sideMenu', val)
    },
    changeTheme (state, theme) {
      let styleList = [
        {
          id: 'elementTheme',
          url: `${process.env.BASE_URL}element-theme/${theme}/index.css`
        }, {
          id: 'followTheme',
          url: `${process.env.BASE_URL}element-theme/${theme}/follow_theme.css`
        }
      ]
      let headTag = document.getElementsByTagName('head')[0]
      localStorage.setItem('theme', theme)
      styleList.forEach(style => {
        let linkTag = document.getElementById(style.id)
        if (theme === 'default') {
          linkTag && headTag.removeChild(linkTag)
        } else if (linkTag) {
          linkTag.href = style.url
        } else {
          linkTag = document.createElement('link')
          linkTag.id = style.id
          linkTag.href = style.url
          linkTag.rel = 'stylesheet'
          headTag.appendChild(linkTag)
        }
      })
    },
    refreshTabRouter (state) {
      state.tabRouterKey += 1
    },
    toggleSize (state, size) {
      state.size = size
      this._vm['$ELEMENT'].size = size
      this.commit('refreshTabRouter')
      localStorage.setItem('size', size)
    },
    setUserInfo (state, user) {
      state.userInfo = user
    },
    setMenuActiveIndex (state, index) {
      state.menuActiveIndex = index
    },
    setTabsActiveName (state, name) {
      state.tabsActiveName = name
    },
    addTab (state, tab) {
      state.tabs.push(tab)
    },
    updateTabs (state, tabs) {
      state.tabs = tabs
    },
    refreshMenus (state) {
      state.menuKey += 1
    },
    setMenuData (state, menus) {
      state.menuData = menus
    }
  },
  actions: {
    getMenuData ({ commit }) {
      return this._vm['$http'].get('/api/menu/tree').then(({ ok, data }) => {
        if (ok) commit('setMenuData', data)
        return data
      })
    }
  },
  modules: {}
})
