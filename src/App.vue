<template>
  <transition name="el-fade-in">
    <router-view/>
  </transition>
</template>

<script>
/**
 * Created by bigBigSir on 2019/3/26
 */
export default {
  name: 'App',
  created() {
    const theme = localStorage.getItem('theme') || 'default'
    this.$store.commit('main/changeTheme', theme)
  },
  mounted() {
    const resourceLoading = document.getElementById('resourceLoading')
    const resourceLoadingStyle = document.getElementById('resourceLoadingStyle')
    resourceLoading.parentNode.removeChild(resourceLoading)
    resourceLoadingStyle.parentNode.removeChild(resourceLoadingStyle)
  }
}
</script>

<style lang="scss">
  @import "~@/element-ui/index.css";
  @import "~@/assets/css/index.scss";
</style>
