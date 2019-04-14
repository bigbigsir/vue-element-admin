<template>
  <el-submenu v-if="menu.children && menu.children.length" :index="menu.id" :popper-append-to-body="false">
    <template slot="title">
      <svg-icon :icon="menu.icon||'tag'"/>
      <span>{{ menu.label }}</span>
    </template>
    <sub-menu v-for="item in menu.children" :key="item.id" :menu="item"></sub-menu>
  </el-submenu>
  <el-menu-item v-else :index="menu.id">
    <svg-icon :icon="menu.icon||'tag'"/>
    <span slot="title">{{ menu.label }}</span>
  </el-menu-item>
</template>

<script>
  /**
   * Created by bigBigSir on 2019/4/3
   */

  export default {
    name: 'subMenu',
    props: {
      menu: {
        type: Object,
        required: true
      }
    }
  }
</script>
