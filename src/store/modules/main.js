/**
 * Created by bigBigSir on 2019/4/8
 */
'use strict'

export default {
  namespaced: true,
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
    }], // 打开的标签页
    tabActiveName: null, // 当前选中标签页的 name
    menuData: null, // 菜单数据
    menuActiveIndex: null, // 当前激活菜单的 index
    isCollapse: false, // 主页是否折叠
    tabRouterKey: 0, // 标签页中router标签的key，用于刷新
    headerFollowTheme: localStorage.getItem('header') !== 'false', // Header背景是否跟随主题
    sideMenuDarkSkin: localStorage.getItem('sideMenu') !== 'false', // 菜单是否开启Dark模式
    size: localStorage.getItem('size') || 'medium' // Element全局大小
  },
  mutations: {
    // 刷新菜单
    refreshMenus (state) {
      state.menuKey += 1
    },
    // 刷新路由页面
    refreshRouter (state) {
      state.tabRouterKey += 1
    },
    // 切换折叠模式
    toggleCollapse (state, val) {
      state.isCollapse = val
    },
    // 切换Header背景是否跟随主题
    toggleHeaderSkin (state, val) {
      state.headerFollowTheme = val
      localStorage.setItem('header', val)
    },
    // 切换菜单Dark/Light模式
    toggleSideMenuSkin (state, val) {
      state.sideMenuDarkSkin = val
      localStorage.setItem('sideMenu', val)
    },
    // 改变Element主题
    changeTheme (state, theme) {
      const styleList = [
        {
          id: 'elementTheme',
          url: `${process.env.BASE_URL}element-theme/${theme}/index.css`
        }, {
          id: 'followTheme',
          url: `${process.env.BASE_URL}element-theme/${theme}/follow_theme.css`
        }
      ]
      const headTag = document.getElementsByTagName('head')[0]
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
    // 改变Element全局大小
    changeSize (state, size) {
      state.size = size
      this._vm.$ELEMENT.size = size
      this.commit('main/refreshRouter')
      localStorage.setItem('size', size)
    },
    // 设置当前激活菜单的 index
    setMenuActiveIndex (state, index) {
      state.menuActiveIndex = index
    },
    // 设置选中标签页的 name
    setTabsActiveName (state, name) {
      state.tabActiveName = name
    },
    // 添加标签
    addTab (state, tab) {
      state.tabs.push(tab)
    },
    // 更新标签数组
    updateTabs (state, tabs) {
      state.tabs = tabs
    },
    // 设置菜单数据
    setMenuData (state, menus) {
      state.menuData = menus
    }
  }
}
