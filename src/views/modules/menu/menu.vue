<template>
  <el-card class="box-card" shadow="never">
    <div slot="header">
      <el-button @click="addOrUpdateHandle(null)" type="primary">
        <svg-icon icon="plus"></svg-icon>
        {{ $t('add') }}
      </el-button>
    </div>
    <el-table :data="menuData" v-loading="getDataLoading" border>
      <table-tree-column :label="$t('menu.name')" prop="label"
                         :menuData="menuData"
                         :childKey="childKey"
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
      <el-table-column :label="$t('menu.openMode')" prop="openMode" align="center" width="150"></el-table-column>
      <el-table-column :label="$t('menu.sort')" prop="sort" align="center" width="180">
        <template slot-scope="scope">
          <el-input-number
            v-model="scope.row.sort"
            @change="updateSort('id',scope.row.id,'sort',scope.row.sort)"
            :min="1" :max="100"
            size="small">
          </el-input-number>
        </template>
      </el-table-column>
      <el-table-column :label="$t('handle')" fixed="right" align="center" width="150">
        <template slot-scope="scope">
          <el-button @click="addOrUpdateHandle(scope.row.id)" class="pd0" type="text">{{ $t('update') }}</el-button>
          <el-button @click="deleteMenu(scope.row)" class="pd0" type="text">{{ $t('delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <addOrUpdate :menuData="copyMenuData" @refreshList="getListData"
                 v-if="isRenderDialog" ref="addOrUpdate">
    </addOrUpdate>
  </el-card>
</template>

<script>
/**
   * Created by bigBigSir on 2019/4/3
   */
import addOrUpdate from './addOrUpdate.vue'
import moduleMixin from '@/mixins/moduleMixin'
import TableTreeColumn from '@/components/TableTreeColumn.vue'

export default {
  name: 'sys_menu',
  mixins: [moduleMixin],
  components: { TableTreeColumn, addOrUpdate },
  data () {
    return {
      childKey: 'child',
      menuData: [],
      copyMenuData: [],
      mixinConfig: {
        getListDataURL: '/api/menu/tree',
        deleteURL: '/api/menu/remove',
        updateSortURL: '/api/menu/updateOne'
      }
    }
  },
  created () {
    console.log('sys_menu')
  },
  methods: {
    // 数据请求成功之后的回调
    getListDataAfter (data) {
      this.copyMenuData = JSON.parse(JSON.stringify(data))
      // ElementUi官方2.7.0支持树表格，检测到children会强行使用官方组件
      recursion.call(this, data)
      this.menuData = data

      function recursion (nodes) {
        nodes.forEach(item => {
          item[this.childKey] = item.children
          delete item.children
          if (item[this.childKey].length) {
            recursion.call(this, item[this.childKey])
          }
        })
      }
    },
    // 更新菜单数据
    updateMenuData (data) {
      this.menuData = data
    },
    // 删除菜单
    deleteMenu (row) {
      const id = this.recursionPushId(row)
      this.deleteHandle(id)
    },
    // 添加指定节点及下面子节点的id
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
