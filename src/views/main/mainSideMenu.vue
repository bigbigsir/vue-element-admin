<template>
  <aside :class="{'side-menu-dark':sideMenuDarkSkin}" class="main-side-menu fl">
    <div class="side-menu-inner">
      <el-menu
        :collapse="isCollapse"
        :collapse-transition="false"
        class="side-menu-root"
        default-active="2">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
          <el-menu-item index="1-1">
            <template slot="title">
              <svg-icon className="test" icon="home"/>
              <span>选项1</span>
            </template>
          </el-menu-item>
          <el-menu-item index="1-2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>选项2</span>
            </template>
          </el-menu-item>
          <el-menu-item index="1-3">选项3</el-menu-item>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项1选项1选项1选项1选项1选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航二</span>
          </template>
          <el-menu-item index="2-1">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二导航二导航二导航二导航二导航二</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item index="3">
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>
    </div>
  </aside>
</template>

<script>
  /**
   * Created by XiaoJie on 2019/3/28
   */
  import { mapState } from 'vuex'

  export default {
    name: 'mainSideMenu',
    data () {
      return {}
    },
    computed: {
      ...mapState(['isCollapse', 'sideMenuDarkSkin'])
    }
  }
</script>
