<template>
  <main class="main-content">
    <div class="main-content-inner">
      <el-dropdown @command="handleCommand" class="tabs-tools cursor-pr" trigger="click">
        <span class="el-dropdown-link">
          <svg-icon icon="menu"/>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="3">
            <svg-icon icon="flag"/>
            关闭当前
          </el-dropdown-item>
          <el-dropdown-item command="2">
            <svg-icon icon="tag"/>
            关闭其他
          </el-dropdown-item>
          <el-dropdown-item command="1">
            <svg-icon icon="tags"/>
            关闭全部
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-tabs @tab-remove="tabRemoveHandle" class="main-content-tabs" v-model="activeName">
        <el-tab-pane
          :closable="item.name!=='home'"
          :key="item.name" :name="item.name"
          v-for="item in tabs">
          <template slot="label">
            <svg-icon :icon="item.icon" v-if="item.icon"/>
            {{item.name!=='home'?item.label:''}}
          </template>
          <router-view/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </main>
</template>

<script>
  /**
   * Created by XiaoJie on 2019/3/28
   */
  export default {
    name: 'mainContent',
    data () {
      return {
        activeName: 'home',
        tabs: [
          {
            name: 'home',
            path: '/home',
            label: '主页',
            icon: 'home'
          },
          {
            name: 'user',
            path: '/user',
            label: '用户管理',
            icon: 'tag'
          },
          {
            name: 'role',
            path: '/role',
            label: '角色管理',
            icon: 'tags'
          },
          {
            name: 'menu',
            path: '/menu',
            label: '菜单管理',
            icon: null
          }
        ]
      }
    },
    computed: {
      isCollapse () {
        return this.$store.state.isCollapse
      }
    },
    methods: {
      tabRemoveHandle (name) {
        console.log(name)
      },
      handleCommand (command) {
        console.log(command)
      }
    }
  }
</script>
