<template>
  <main class="main-content">
    <div class="main-content-inner">
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
      <el-tabs v-model="_tabsActiveName"
               @tab-click="tabSelectedHandle"
               @tab-remove="removeTab"
               class="main-content-tabs">
        <el-tab-pane
          v-for="item in tabs"
          :key="item.name"
          :name="item.name"
          :closable="item.name!=='sys_home'">
          <template slot="label">
            <svg-icon :icon="item.icon" v-if="item.icon"/>
            {{item.name!=='sys_home'?item.label:''}}
          </template>
          <el-scrollbar>
            <router-view v-if="item.name===tabsActiveName"/>
          </el-scrollbar>
        </el-tab-pane>
      </el-tabs>
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
      ...mapState(['tabs', 'tabsActiveName', 'isCollapse']),
      _tabsActiveName: {
        get () {
          return this.tabsActiveName
        },
        set (value) {
          this.setTabsActiveName(value)
        }
      }
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
      // tabs, 选中tab
      tabSelectedHandle (tab) {
        tab = this.tabs.filter(item => item.name === tab.name)[0]
        if (tab) {
          this.$router.push({
            'name': tab.name,
            'params': { ...tab.params },
            'query': { ...tab.query }
          })
        }
      },
      // tabs, 删除tab
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
