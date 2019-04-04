<template>
  <div id="main"
       :class="{collapse:isCollapse}"
       v-loading.fullscreen.lock="loading"
       :element-loading-text="'Loading···'"
       class="main-container reset-element-ui clearfix">
    <MainHeader></MainHeader>
    <MainSideMenu></MainSideMenu>
    <MainContent v-if="!refreshContent"></MainContent>
  </div>
</template>

<script>
  /**
   * Created by XiaoJie on 2019/3/28
   */
  import debounce from 'lodash/debounce'
  import { mapState, mapMutations } from 'vuex'
  import MainHeader from './mainHeader.vue'
  import MainContent from './mainContent.vue'
  import MainSideMenu from './mainSideMenu.vue'

  export default {
    name: 'mainPage',
    components: {
      MainHeader,
      MainContent,
      MainSideMenu
    },
    data () {
      return {
        loading: true
      }
    },
    created () {
      this.getUserInfo()
      this.windowResizeHandle()
    },
    beforeRouteEnter (to, form, next) {
      next(vm => {
        vm.routeHandle(to)
      })
    },
    watch: {
      $route: 'routeHandle'
    },
    computed: {
      ...mapState(['tabs', 'menuData', 'tabsActiveName', 'isCollapse', 'refreshContent'])
    },
    methods: {
      ...mapMutations(['addTab', 'updateMenus', 'setMenuActiveIndex', 'setTabsActiveName', 'setUserInfo', 'toggleCollapse']),
      // 获取用户信息
      getUserInfo () {
        this.$http.get('user/getUserInfo').then(({ ok, data }) => {
          if (ok && data) {
            this.loading = false
            this.setUserInfo(data)
          } else {
            this.$router.replace('/login')
          }
        }).catch(() => this.$router.replace('/login'))
      },
      // 窗口改变大小
      windowResizeHandle () {
        this.toggleCollapse(document.body.clientWidth < 1000)
        window.addEventListener('resize', debounce(() => {
          this.toggleCollapse(document.body.clientWidth < 1000)
        }, 200))
      },
      // 路由, 监听
      routeHandle (to) {
        if (!to.meta.isTab) return false
        let tab = this.tabs.filter(item => item.name === to.name)[0]
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
        this.setMenuActiveIndex(tab.id)
        this.setTabsActiveName(to.name)
      }
    }
  }
</script>
