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
      this.$store.commit('main/changeTheme', theme)
    },
    mounted () {
      let resourceLoading = document.getElementById('resourceLoading')
      let resourceLoadingStyle = document.getElementById('resourceLoadingStyle')
      resourceLoading.parentNode.removeChild(resourceLoading)
      resourceLoadingStyle.parentNode.removeChild(resourceLoadingStyle)
    }
  }
</script>
