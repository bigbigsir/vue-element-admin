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
      let styleList = []
      let files = require.context(`../../public/element-theme`, true, /\.css$/).keys()
      let headTag = document.getElementsByTagName('head')[0]
      localStorage.setItem('theme', theme)
      if (theme === 'default') {
        return [...headTag.children].forEach(node => {
          if (node.id && ~node.id.indexOf('theme_')) {
            headTag.removeChild(node)
          }
        })
      }
      files.forEach((file) => {
        if (~file.indexOf(theme)) {
          styleList.push({
            id: `theme_${styleList.length}`,
            url: `${process.env.BASE_URL}element-theme/${file.replace(/^\.\//, '')}`
          })
        }
      })
      styleList.forEach(style => {
        let linkTag = document.getElementById(style.id)
        if (linkTag) {
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
