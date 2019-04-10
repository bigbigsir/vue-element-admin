<template>
  <el-card class="box-card" shadow="never">
    <div slot="header">
      <el-button @click="addOrUpdateHandle(null)" type="primary">{{ $t('add') }}</el-button>
    </div>
    <el-table v-loading="getDataLoading" :data="listData" border>
      <el-table-column :label="$t('module.name')" prop="name" align="center"></el-table-column>
      <el-table-column :label="$t('module.userName')" prop="userName" align="center"></el-table-column>
      <el-table-column :label="$t('module.code')" prop="code" align="center"></el-table-column>
      <el-table-column :label="$t('module.createDate')" prop="createTime" align="center">
        <template slot-scope="scope">
          {{scope.row['createTime']|moment}}
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentPageChange"
      :current-page="page"
      :page-sizes="[10, 30, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </el-card>
</template>

<script>
  /**
   * Created by XiaoJie on 2019/4/10
   */
  import moduleMixin from '@/mixins/moduleMixin'

  export default {
    name: 'user',
    mixins: [moduleMixin],
    data () {
      return {
        copyMenuData: [],
        mixinConfig: {
          getListDataIsPage: true,
          getListDataURL: '/api/user/findPage',
          deleteURL: '/api/user/remove'
        }
      }
    },
    created () {
      console.log('user')
    },
    methods: {}
  }
</script>

<style lang="scss" scoped>

</style>
