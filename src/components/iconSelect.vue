<template>
  <el-dialog
    :visible.sync="visible"
    title="Icons"
    append-to-body
    custom-class="icon-select-dialog">
    <el-scrollbar>
      <ul class="icon-list" v-loading="loading">
        <li v-for="item of iconList" :key="item">
          <el-button @click="handleClick(item)">
            <svg-icon :icon="item"/>
          </el-button>
        </li>
      </ul>
    </el-scrollbar>
  </el-dialog>
</template>

<script>
  /**
   * Created by bigBigSir on 2019/4/5
   */
  import { getSvgIconList } from '@/util/util'

  export default {
    name: 'iconSelect',
    props: {
      showIconSelect: {
        type: Boolean,
        required: true,
        default: false
      }
    },
    data () {
      return {
        loading: true,
        iconList: []
      }
    },
    computed: {
      visible: {
        get () {
          return this.showIconSelect
        },
        set (value) {
          this.$emit('update:showIconSelect', value)
        }
      }
    },
    created () {
      this.iconList = getSvgIconList()
    },
    mounted () {
      this.loading = false
    },
    methods: {
      handleClick (icon) {
        this.$emit('getIcon', icon)
      }
    }
  }
</script>

<style lang="scss">
  .icon-select-dialog {
    min-width: 528px;

    .el-scrollbar {
      height: 500px;

      .el-scrollbar__wrap {
        overflow-x: hidden;
      }
    }

    .icon-list {
      margin: 0;
      padding: 0;

      overflow: auto;

      .el-button {
        padding: 8px;
        font-size: 18px;
      }

      li {
        display: inline-block;
        margin: 4px;
      }
    }
  }
</style>
