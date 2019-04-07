<template>
  <main class="main-content">
    <div class="main-content-inner">
      <template v-if="$route.meta.openMode==='tab'">
        <el-dropdown @command="handleCommand" size="medium" class="tabs-tools cursor-pr" trigger="click">
        <span class="el-dropdown-link">
          <svg-icon icon="menu"/>
        </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="now">
              <svg-icon icon="flag"/>&nbsp;关闭当前
            </el-dropdown-item>
            <el-dropdown-item command="other">
              <svg-icon icon="tag"/>&nbsp;关闭其他
            </el-dropdown-item>
            <el-dropdown-item command="all">
              <svg-icon icon="tags"/>&nbsp;关闭全部
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-tabs :value="tabsActiveName" @tab-click="tabSelectedHandle" @tab-remove="removeTab"
                 class="main-content-tabs">
          <el-tab-pane
            v-for="tab in tabs"
            :key="tab.name"
            :name="tab.name"
            :closable="tab.name!=='sys_home'"
            :class="{'iframe-wrapper':tab.isIframe}">
            <template slot="label">
              <svg-icon :icon="tab.icon" v-if="tab.icon"/>
              {{tab.name!=='sys_home'?tab.label:''}}
            </template>
            <template v-if="tab.isIframe">
              <iframe :src="tab.resourceUrl" width="100%" height="100%" scrolling="auto" frameborder="0"></iframe>
            </template>
            <template v-else>
              <el-scrollbar class="b-r-small">
                <router-view :key="tabRouterKey" v-if="tab.name===tabsActiveName"/>
              </el-scrollbar>
            </template>
          </el-tab-pane>
        </el-tabs>
      </template>
      <template v-else-if="$route.meta.openMode==='home'">
        <template v-if="$route.meta.isIframe">
          <iframe :src="$route.meta.resourceUrl" width="100%" height="100%" scrolling="auto" frameborder="0"></iframe>
        </template>
        <template v-else>
          <el-scrollbar class="b-r-small">
            <router-view :key="tabRouterKey"/>
          </el-scrollbar>
        </template>
      </template>
    </div>
  </main>
</template>

<script>
  /**
   * Created by XiaoJie on 2019/3/28
   */
  import { mapState, mapMutations } from 'vuex'

  export default {
    name: 'mainContent',
    data () {
      return {}
    },
    computed: {
      ...mapState(['tabs', 'tabsActiveName', 'tabRouterKey', 'isCollapse'])
    },
    methods: {
      ...mapMutations(['updateTabs', 'setTabsActiveName']),
      handleCommand (command) {
        if (command === 'now') {
          this.removeTab(this.tabsActiveName)
        } else if (command === 'other') {
          this.removeOtherTabs()
        } else {
          this.removeAllTabs()
        }
      },
      // 选中tab事件
      tabSelectedHandle (tab) {
        if (tab.name === this.tabsActiveName) return
        tab = this.tabs.filter(item => item.name === tab.name)[0]
        if (tab) {
          this.$router.push({
            'name': tab.name,
            'params': { ...tab.params },
            'query': { ...tab.query }
          })
        }
      },
      // tabs, 删除当前tab
      removeTab (tabName) {
        let nowTabIndex = null
        if (tabName === 'sys_home') return false
        let tabs = this.tabs.filter((item, index) => {
          if (item.name === tabName) nowTabIndex = index
          return item.name !== tabName
        })
        this.updateTabs(tabs)
        if (nowTabIndex !== this.tabs.length - 1) {
          nowTabIndex = nowTabIndex - 1
        }
        this.$router.push({
          name: this.tabs[nowTabIndex].name,
          query: { ...this.tabs[nowTabIndex].query },
          params: { ...this.tabs[nowTabIndex].params }
        })
      },
      // tabs, 关闭其它
      removeOtherTabs () {
        this.updateTabs(this.tabs.filter(item => {
          return item.name === 'sys_home' || item.name === this.tabsActiveName
        }))
      },
      // tabs, 关闭全部
      removeAllTabs () {
        this.updateTabs(this.tabs.filter(item => item.name === 'sys_home'))
        this.$router.push({
          name: 'sys_home',
          query: { ...this.tabs[0].query },
          params: { ...this.tabs[0].params }
        })
      }
    }
  }
</script>
