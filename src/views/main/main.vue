<template>
  <div id="main"
       :class="{collapse:isCollapse}"
       v-loading.fullscreen.lock="loading"
       :element-loading-text="'Loading···'"
       class="main-container reset-element-ui clearfix">
    <MainHeader></MainHeader>
    <MainSideMenu></MainSideMenu>
    <MainContent></MainContent>
  </div>
</template>

<script>
  /**
   * Created by XiaoJie on 2019/3/28
   */
  import MainHeader from './mainHeader.vue'
  import MainContent from './mainContent.vue'
  import MainSideMenu from './mainSideMenu.vue'
  import debounce from 'lodash/debounce'
  import { mapState, mapMutations } from 'vuex'

  export default {
    name: 'mainPage',
    components: {
      MainHeader,
      MainContent,
      MainSideMenu
    },
    watch: {
      $route: 'routeHandle'
    },
    beforeRouteEnter (to, from, next) {
      // 进入页面初始化当前路由tab
      next(vm => {
        vm.routeHandle(to)
      })
    },
    beforeRouteLeave (to, from, next) {
      // 离开页面清空当前菜单选中项标识
      this.setMenuActiveIndex(null)
      next()
    },
    data () {
      return {
        loading: true
      }
    },
    created () {
      this.windowResizeHandle()
      if (this.userInfo && this.menuData) return (this.loading = false)
      Promise.all([this.getMenuData(), this.getUserInfo()]).then(() => {
        this.loading = false
      }).catch(() => {
        this.$router.replace('/login')
      })
    },
    computed: {
      ...mapState('main', ['tabs', 'userInfo', 'menuData', 'isCollapse'])
    },
    methods: {
      ...mapMutations('main', [
        'addTab',
        'setMenuData',
        'setUserInfo',
        'toggleCollapse',
        'setMenuActiveIndex',
        'setTabsActiveName'
      ]),
      // 获取菜单数据
      getMenuData () {
        return this.$http.get('/api/menu/tree').then(({ ok, data }) => {
          if (ok) {
            this.setMenuData(data)
          }
        })
      },
      // 获取用户信息
      getUserInfo () {
        return this.$http.get('user/getUserInfo').then(({ ok, data }) => {
          if (ok && data) {
            this.setUserInfo(data)
          }
        })
      },
      // 监听窗口大小改变
      windowResizeHandle () {
        this.toggleCollapse(document.body.clientWidth < 1000)
        window.addEventListener('resize', debounce(() => {
          this.toggleCollapse(document.body.clientWidth < 1000)
        }, 200))
      },
      // 主页下路由变化的处理方法
      routeHandle (to) {
        this.setMenuActiveIndex(to.meta.id)
        if (to.meta.openMode !== 'tab') return false
        let tab = this.tabs.find(item => item.name === to.name)
        if (!tab) {
          tab = {
            ...to.meta,
            'path': to.path,
            'name': to.name,
            'params': { ...to.params },
            'query': { ...to.query }
          }
          this.addTab(tab)
        }
        this.setTabsActiveName(to.name)
      }
    }
  }
</script>
