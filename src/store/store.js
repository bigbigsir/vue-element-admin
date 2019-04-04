import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tabs: [
      {
        'path': '/home',
        'name': 'sys_home',
        'icon': 'home',
        'params': null,
        'query': null,
        'id': null,
        'title': null,
        'isTab': true,
        'iframeURL': null
      }
    ],
    tabsActiveName: 'sys_home',
    menuData: [
      {
        'id': '5b4369a4571a52242c5c488b',
        'routerName': '',
        'label': '系统管理',
        'state': true,
        'sort': 1,
        'icon': 'setting',
        'menuCode': 'xi_tong_guan_li',
        'path': '',
        'description': '用于系统管理的菜单',
        '_parentId': null,
        'createTime': 1531144612701,
        'children': [
          {
            'id': '5b436ad8571a52242c5c488c',
            'name': 'user',
            'label': '人员管理',
            'state': true,
            'sort': 1,
            'menuCode': 'ren_yuan_guan_li',
            'path': '/user',
            'description': '用于人员管理的菜单',
            '_parentId': '5b4369a4571a52242c5c488b',
            'createTime': 1531144920765,
            'updateTime': 1531145918521,
            'children': []
          }, {
            'id': '5b436af5571a52242c5c488d',
            'name': 'role',
            'label': '角色管理',
            'state': true,
            'sort': 2,
            'menuCode': 'jiao_se_guan_li',
            'path': '/role',
            'description': '用于角色管理的菜单',
            '_parentId': '5b4369a4571a52242c5c488b',
            'createTime': 1531144949358,
            'updateTime': 1531145956167,
            'children': []
          }, {
            'id': '5b436b2b571a52242c5c488e',
            'name': 'menu',
            'label': '菜单管理',
            'state': true,
            'sort': 3,
            'menuCode': 'cai_dan_guan_li',
            'path': '/menu',
            'description': '用于菜单管理的菜单',
            '_parentId': '5b4369a4571a52242c5c488b',
            'createTime': 1531145003492,
            'updateTime': 1532002821364,
            'children': []
          }, {
            'id': '5b436c03571a52242c5c488f',
            'name': 'svgIcon',
            'label': '图标管理',
            'state': true,
            'sort': 4,
            'menuCode': 'quan_xian_guan_li',
            'path': '/svgIcon',
            'description': '用于权限管理的菜单',
            '_parentId': '5b4369a4571a52242c5c488b',
            'createTime': 1531145219549,
            'children': []
          }
        ]
      }
    ],
    menuActiveIndex: null,
    userInfo: null,
    isCollapse: false,
    refreshContent: false,
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
    refreshRouter (state) {
      state.refreshContent = true
      this._vm.$nextTick(() => {
        state.refreshContent = false
      })
    },
    toggleSize (state, size) {
      state.size = size
      this._vm['$ELEMENT'].size = size
      this.commit('refreshRouter')
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
    updateMenus (state, menus) {
      state.menuData = menus
    }
  },
  actions: {},
  modules: {}
})
