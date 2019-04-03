<template>
  <el-dropdown @command="toggleSize" trigger="click" size="medium" placement="bottom">
      <span class="el-dropdown-link">
        <slot></slot>
      </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="item of sizeOptions"
        :key="item.value"
        :disabled="size===item.value"
        :command="item.value">
        {{ item.label }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
  /**
   * Created by XiaoJie on 2019/4/2
   */
  import { mapState, mapMutations } from 'vuex'

  export default {
    name: 'SizeSelect',
    data () {
      return {
        sizeOptions: [
          { label: 'Default', value: 'default' },
          { label: 'Medium', value: 'medium' },
          { label: 'Small', value: 'small' },
          { label: 'Mini', value: 'mini' }
        ]
      }
    },
    created () {
    },
    computed: {
      ...mapState(['size'])
    },
    methods: {
      ...mapMutations(['toggleSize'])
    }
  }
</script>

<style lang="scss" scoped>

</style>
