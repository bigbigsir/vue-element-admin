<template>
  <div class="not-found-content">
    <h1 class="title">404</h1>
    <h3 class="description" v-html="$t('notFound.description')"></h3>
    <div>
      <el-button @click="$router.back()">
        <svg-icon icon="rollback"/>&nbsp;{{$t('notFound.back')}}
      </el-button>
      <el-button @click="toHomePage" type="primary">
        <svg-icon icon="home"/>&nbsp;{{$t('notFound.home')}}
      </el-button>
    </div>
  </div>
</template>

<script>
/**
   * Created by bigBigSir on 2019/4/2
   */

export default {
  name: 'page404',
  methods: {
    toHomePage () {
      this.$store.commit('main/setTabsActiveName', null)
      this.$router.replace('/home')
    }
  }
}
</script>

<style lang="scss" scoped>
  .not-found-content {
    position: absolute;
    width: 100%;
    margin-top: 200px;
    text-align: center;
    animation-name: slideUp;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
  }

  .title {
    margin: 0 0 15px;
    font-size: 10em;
    font-weight: 400;
    color: #606266;
  }

  .description {
    margin-bottom: 20px;
    font-size: 26px;
    font-weight: 400;
    color: #909399;

    span {
      margin: 0 5px;
      color: #e6a23c;
    }
  }

  @keyframes slideUp {
    0% {
      transform: translateY(60px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
</style>
