<template>
  <el-card class="box-card">
    <div slot="header">
      <el-button type="primary">{{ $t('add') }}</el-button>
    </div>
    <el-table v-loading="dataListLoading" :data="menuData" border>
      <table-tree-column prop="label"
                         :label="$t('menu.name')"
                         :menuData="menuData"
                         @updateMenuData="updateMenuData"
                         header-align="center">
      </table-tree-column>
      <el-table-column label="菜单名称" prop="label" align="center"></el-table-column>
      <el-table-column label="菜单图标" prop="icon" align="center">
        <template slot-scope="scope">
          <svg-icon :icon="scope.row.icon"></svg-icon>
        </template>
      </el-table-column>
      <el-table-column label="菜单编码" prop="menuCode" align="center"></el-table-column>
      <el-table-column label="菜单路由" prop="routerPath" align="center"></el-table-column>
      <el-table-column label="路由名称" prop="routerName" align="center"></el-table-column>
      <el-table-column label="菜单描述" prop="description" align="center"></el-table-column>
      <el-table-column :label="$t('handle')" fixed="right" align="center">
        <template slot-scope="">
          <el-button type="text">{{ $t('update') }}</el-button>
          <el-button type="text">{{ $t('delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
  /**
   * Created by XiaoJie on 2019/4/3
   */
  import TableTreeColumn from '@/components/TableTreeColumn.vue'

  export default {
    name: 'sys_menu',
    components: { TableTreeColumn },
    data () {
      return {
        menuData: [],
        dataListLoading: true
      }
    },
    created () {
      console.log('sys_menu')
      this.getMenuData()
    },
    methods: {
      getMenuData () {
        this.$http.get('/api/menu/tree').then(({ ok, data }) => {
          this.dataListLoading = false
          if (ok) this.menuData = data
        })
      },
      updateMenuData (data) {
        this.menuData = data
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
