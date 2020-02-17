<template>
  <el-dropdown @command="_changeSize" trigger="click" size="medium" placement="bottom">
      <span class="trigger">
        <slot></slot>
      </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="item of sizeOptions"
        :key="item.value"
        :disabled="size===item.value"
        :command="item.value">
        {{ $t('size.'+item.label) }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
/**
   * Created by bigBigSir on 2019/4/2
   */
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'SizeSelect',
  data () {
    return {
      sizeOptions: [
        { label: 'default', value: 'default' },
        { label: 'medium', value: 'medium' },
        { label: 'small', value: 'small' },
        { label: 'mini', value: 'mini' }
      ]
    }
  },
  created () {
  },
  computed: {
    ...mapState('main', ['size'])
  },
  methods: {
    ...mapMutations('main', ['changeSize']),
    _changeSize (size) {
      this.changeSize(size)
      this.$message({
        type: 'success',
        message: this.$t('prompt.success'),
        duration: 1000
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
