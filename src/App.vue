<template>
  <transition name="el-fade-in">
    <router-view/>
  </transition>
</template>

<script>
  /**
   * Created by XiaoJie on 2019/3/26
   */
  export default {
    name: 'App',
    created () {
      let theme = localStorage.getItem('theme') || 'default'
      this.$store.commit('changeTheme', theme)
    }
  }
</script>
