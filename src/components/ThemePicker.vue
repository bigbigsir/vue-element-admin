<template>
  <el-popover
    placement="bottom"
    transition="el-fade-in"
    trigger="click">
    <div class="theme-picker-content">
      <div class="theme-item">
        <h3>HeaderNavBar</h3>
        <el-checkbox @change="toggleHeaderSkin" v-model="header">follow-theme&nbsp;鲜艳</el-checkbox>
      </div>
      <div class="theme-item b-c-lighter">
        <h3>SideMenu</h3>
        <el-checkbox @change="toggleSideMenuSkin" v-model="sideMenu">dark&nbsp;黑色</el-checkbox>
      </div>
      <div class="theme-item b-c-lighter">
        <h3>Theme</h3>
        <el-radio-group @change="changeTheme" v-model="theme">
          <el-radio :key="item.name" :label="item.name" v-for="item in themeList">
            <span :style="{color:item.color}">{{ `${item.name}&nbsp;${item.label}` }}</span>
          </el-radio>
        </el-radio-group>
      </div>
    </div>
    <span class="picker-toggle" slot="reference">
      <slot></slot>
    </span>
  </el-popover>
</template>

<script>
  /**
   * Created by XiaoJie on 2019/3/31
   */
  import { mapState, mapMutations } from 'vuex'

  export default {
    name: 'ThemePicker',
    data () {
      return {
        theme: localStorage.getItem('theme') || 'default',
        header: false,
        sideMenu: false,
        themeList: require('@/theme_config/config.js')
      }
    },
    created () {
      this.header = this.headerFollowTheme
      this.sideMenu = this.sideMenuDarkSkin
    },
    computed: {
      ...mapState(['headerFollowTheme', 'sideMenuDarkSkin'])
    },
    methods: {
      ...mapMutations(['changeTheme', 'toggleHeaderSkin', 'toggleSideMenuSkin'])
    }
  }
</script>

<style lang="scss">
  .theme-picker-content {
    width: 200px;
    padding: 0 5px;

    .theme-item + .theme-item {
      margin-top: 15px;
      border-top-width: 1px;
      border-top-style: solid;

      .el-radio {
        margin-right: 0;
        width: 100%;
        line-height: 28px;
      }
    }
  }

  .picker-toggle {
    padding: 2px 0;
  }
</style>
