<template>
  <el-card class="box-card" shadow="never">
    <div slot="header">
      <el-button @click="addMenu(null)" type="primary">{{ $t('add') }}</el-button>
    </div>
    <el-table v-loading="dataListLoading" :data="menuData" border>
      <table-tree-column :label="$t('menu.name')" prop="label"
                         :menuData="menuData"
                         @updateMenuData="updateMenuData"
                         min-width="150px">
      </table-tree-column>
      <el-table-column label="菜单图标" prop="icon" align="center">
        <template slot-scope="scope">
          <svg-icon :icon="scope.row.icon"></svg-icon>
        </template>
      </el-table-column>
      <el-table-column label="路由地址" prop="routerPath" align="center"></el-table-column>
      <el-table-column label="资源地址" prop="resourceUrl" min-width="150px" align="center"></el-table-column>
      <el-table-column label="打开方式" prop="openMode" align="center"></el-table-column>
      <el-table-column label="排序" prop="sort" align="center"></el-table-column>
      <el-table-column :label="$t('handle')" fixed="right" align="center" width="150">
        <template slot-scope="scope">
          <el-button @click="addMenu(scope.row.id)" class="pd0px" type="text">{{ $t('update') }}</el-button>
          <el-button @click="deleteMenu(scope.row)" class="pd0px" type="text">{{ $t('delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <addOrUpdate @getMenuData="getMenuData" v-if="isShowDialog" :menuData="copyMenuData" ref="dialog"></addOrUpdate>
  </el-card>
</template>

<script>
  /**
   * Created by XiaoJie on 2019/4/3
   */
  import TableTreeColumn from '@/components/TableTreeColumn.vue'
  import addOrUpdate from './menu/addOrUpdate.vue'

  export default {
    name: 'sys_menu',
    components: { TableTreeColumn, addOrUpdate },
    data () {
      return {
        menuData: [],
        copyMenuData: [],
        dataListLoading: true,
        isShowDialog: false
      }
    },
    created () {
      console.log('sys_menu')
      this.getMenuData()
    },
    methods: {
      getMenuData () {
        this.$http.get('/api/menu/tree').then(({ ok, data }) => {
          if (ok) {
            this.menuData = data
            this.copyMenuData = [...data]
          }
          this.dataListLoading = false
        })
      },
      updateMenuData (data) {
        this.menuData = data
      },
      addMenu (id) {
        this.isShowDialog = true
        this.$nextTick(() => {
          this.$refs.dialog.visible = true
          this.$refs.dialog.formData.id = id
        })
      },
      // 删除菜单
      deleteMenu (row) {
        let id = this.recursionPushId(row)
        let title = this.$t('prompt.title')
        let info = this.$t('prompt.info', {
          'handle': this.$t('delete')
        })
        let config = {
          confirmButtonText: this.$t('confirm'),
          cancelButtonText: this.$t('cancel'),
          type: 'warning'
        }
        this.$confirm(info, title, config).then(() => {
          let url = '/api/menu/remove'
          let params = { id: id }
          this.$http.delete(url, params).then(({ ok }) => {
            if (!ok) return
            this.$message({
              message: this.$t('prompt.success'),
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.getMenuData()
              }
            })
          })
        })
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
