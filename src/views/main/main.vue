<template>
  <div :class="{collapse:isCollapse}" class="main-container reset-element-ui clearfix">
    <MainHeader></MainHeader>
    <MainSideMenu></MainSideMenu>
    <MainContent></MainContent>
  </div>
</template>

<script>
  /**
   * Created by XiaoJie on 2019/3/28
   */
  import MainHeader from './mainHeader.vue'
  import MainContent from './mainContent.vue'
  import MainSideMenu from './mainSideMenu.vue'

  export default {
    name: 'mainPage',
    components: {
      MainHeader,
      MainContent,
      MainSideMenu
    },
    created () {
    },
    computed: {
      isCollapse () {
        return this.$store.state.isCollapse
      }
    }
  }
</script>
