<template>
  <div id="main"
       v-loading.fullscreen.lock="loading"
       :class="{collapse:isCollapse,opacity0:loading}"
       :element-loading-text="$t('loading')"
       class="main-container reset-element-ui clearfix">
    <MainHeader></MainHeader>
    <MainSideMenu></MainSideMenu>
    <MainContent></MainContent>
  </div>
</template>

<script>
  /**
   * Created by bigBigSir on 2019/3/28
   */
  import cookies from 'js-cookie'
  import MainHeader from './mainHeader.vue'
  import MainContent from './mainContent.vue'
  import MainSideMenu from './mainSideMenu.vue'
  import debounce from 'lodash/debounce'
  import { mapState, mapMutations, mapActions } from 'vuex'

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
      this.getUserInfo().then(() => {
        this.loading = false
      }).catch(() => {
        cookies.remove('token')
        this.$router.replace('/login')
      })
    },
    computed: {
      ...mapState('main', ['tabs', 'isCollapse'])
    },
    methods: {
      ...mapActions(['getUserInfo']),
      ...mapMutations('main', [
        'addTab',
        'toggleCollapse',
        'setMenuActiveIndex',
        'setTabsActiveName'
      ]),
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
