<template>
  <el-card class="box-card" shadow="never">
    <div slot="header">
      <el-button @click="addOrUpdateHandle(null)" type="primary">{{ $t('add') }}</el-button>
    </div>
    <el-table v-loading="getDataLoading" :data="listData" border>
      <table-tree-column :label="$t('menu.name')" prop="label"
                         :menuData="listData"
                         @updateMenuData="updateMenuData"
                         min-width="150px">
      </table-tree-column>
      <el-table-column :label="$t('menu.icon')" prop="icon" align="center">
        <template slot-scope="scope">
          <svg-icon :icon="scope.row.icon"></svg-icon>
        </template>
      </el-table-column>
      <el-table-column :label="$t('menu.routePath')" prop="routerPath" align="center"></el-table-column>
      <el-table-column :label="$t('menu.resourceUrl')" prop="resourceUrl" min-width="150px" align="center">
      </el-table-column>
      <el-table-column :label="$t('menu.openMode')" prop="openMode" align="center"></el-table-column>
      <el-table-column :label="$t('menu.sort')" prop="sort" align="center"></el-table-column>
      <el-table-column :label="$t('handle')" fixed="right" align="center" width="150">
        <template slot-scope="scope">
          <el-button @click="addOrUpdateHandle(scope.row.id)" class="pd0px" type="text">{{ $t('update') }}</el-button>
          <el-button @click="deleteMenu(scope.row)" class="pd0px" type="text">{{ $t('delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <addOrUpdate :menuData="copyMenuData"
                 @refreshList="getListData"
                 v-if="isRenderDialog"
                 ref="addOrUpdate">
    </addOrUpdate>
  </el-card>
</template>

<script>
  /**
   * Created by XiaoJie on 2019/4/3
   */
  import addOrUpdate from './menu/addOrUpdate.vue'
  import module from '@/mixins/moduleMixin'
  import TableTreeColumn from '@/components/TableTreeColumn.vue'

  export default {
    name: 'sys_menu',
    mixins: [module],
    components: { TableTreeColumn, addOrUpdate },
    data () {
      return {
        mixinConfig: {
          getListDataURL: '/api/menu/tree',
          deleteURL: '/api/menu/remove'
        }
      }
    },
    computed: {
      copyMenuData () {
        return [...this.listData]
      }
    },
    created () {
      console.log('sys_menu')
    },
    methods: {
      // 更新菜单数据
      updateMenuData (data) {
        this.listData = data
      },
      // 删除菜单
      deleteMenu (row) {
        let id = this.recursionPushId(row)
        this.deleteHandle(id)
      },
      recursionPushId (node, arr = []) {
        arr.push(node.id)
        if (node.children && node.children.length) {
          node.children.forEach(item => this.recursionPushId(item, arr))
        }
        return arr
      }
    }
  }
</script>

<style lang="scss" scoped>
  .pd0px {
    padding: 0;
  }
</style>
