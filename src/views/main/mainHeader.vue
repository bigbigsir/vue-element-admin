<template>
  <header :class="{'follow-theme':headerFollowTheme}" class="main-header clearfix">
    <div class="header-brand fl">
      <h1 v-if="isCollapse">
        <svg-icon icon="CodeSandbox"/>
      </h1>
      <h1 v-else>
        TG管理平台
      </h1>
    </div>
    <ul class="header-nav clearfix">
      <li @click="toggleCollapse" class="nav-item fl">
        <svg-icon icon="indent" v-if="isCollapse"/>
        <svg-icon icon="outdent" v-else/>
      </li>
      <li class="nav-item fr">
        <div class="user-info">
          <img alt="" src="~@/assets/img/avatar.png">
          <span class="user-name">超级管理员</span>
          <i class="icon-down el-icon-arrow-down"></i>
        </div>
      </li>
      <li class="nav-item fr">
        <svg-icon icon="fullscreen"/>
      </li>
      <li class="nav-item fr">
        <svg-icon icon="translate"/>
      </li>
      <li class="nav-item fr">
        <svg-icon icon="font-size"/>
      </li>
      <li class="nav-item fr">
        <ThemePicker></ThemePicker>
      </li>
      <li class="nav-item fr">
        <svg-icon icon="reload"/>
      </li>
    </ul>
  </header>
</template>

<script>
  /**
   * Created by XiaoJie on 2019/3/28
   */
  import { mapState, mapMutations } from 'vuex'
  import ThemePicker from '@/components/ThemePicker.vue'

  export default {
    name: 'mainHeader',
    data () {
      return {
        gridData: [],
        radio2: '3',
        fold: false,
        isTheme: false,
        index: 0
      }
    },
    created () {
    },
    components: {
      ThemePicker
    },
    computed: {
      ...mapState(['isCollapse', 'headerFollowTheme'])
    },
    methods: {
      ...mapMutations(['toggleCollapse'])
    }
  }
</script>
