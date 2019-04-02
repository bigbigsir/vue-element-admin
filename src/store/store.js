import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isCollapse: false,
    headerFollowTheme: true,
    sideMenuDarkSkin: true,
    baseUrl: process.env.NODE_ENV === 'production' ? '' : 'http://127.0.0.1:3000'
  },
  mutations: {
    toggleCollapse (state) {
      state.isCollapse = !state.isCollapse
    },
    toggleHeaderSkin (state, val) {
      state.headerFollowTheme = val
    },
    toggleSideMenuSkin (state, val) {
      state.sideMenuDarkSkin = val
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
    }
  },
  actions: {},
  modules: {}
})
