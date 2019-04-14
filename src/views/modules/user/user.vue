<template>
  <el-card class="box-card" shadow="never">
    <div slot="header">
      <el-button @click="addOrUpdateHandle(null)" type="primary">
        <svg-icon icon="plus"></svg-icon>
        {{ $t('add') }}
      </el-button>
      <el-button @click="deleteHandle(null)" type="danger" plain>
        <svg-icon icon="close"></svg-icon>
        {{ $t('delete') }}
      </el-button>
      <div class="search-wrapper">
        <el-input :placeholder="$t('searchList',{searchName:$t('module.username')})" v-model="queryParams.username">
          <el-button @click="getListData" class="ripple" slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
    </div>
    <el-table @selection-change="selectionChangeHandle" :data="listData" v-loading="getDataLoading" border>
      <el-table-column type="selection" width="50" align="center"></el-table-column>
      <el-table-column :label="$t('module.username')" prop="username" align="center"></el-table-column>
      <el-table-column :label="$t('module.realName')" prop="realName" align="center"></el-table-column>
      <el-table-column :label="$t('module.gender')" prop="gender" align="center">
        <template slot-scope="scope">
          {{scope.row.gender?$t(`gender.gender_${scope.row.gender}`):''}}
        </template>
      </el-table-column>
      <el-table-column :label="$t('module.email')" prop="email" align="center"></el-table-column>
      <el-table-column :label="$t('module.mobile')" prop="mobile" align="center"></el-table-column>
      <el-table-column :label="$t('module.createDate')" prop="createDate" align="center">
        <template slot-scope="scope">
          {{scope.row['createDate']|moment}}
        </template>
      </el-table-column>
      <el-table-column :label="$t('module.status')" prop="status" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="1"
            inactive-value="0"
            @change="updateStatus('id',scope.row.id,'status',scope.row.status)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column :label="$t('handle')" fixed="right" align="center" width="150">
        <template slot-scope="scope">
          <el-button @click="addOrUpdateHandle(scope.row.id)" class="pd0" type="text">{{ $t('update') }}</el-button>
          <el-button @click="_deleteHandle(scope.row.id)" class="pd0" type="text">{{ $t('delete') }}</el-button>
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
    <addOrUpdate v-if="isRenderDialog" @refreshList="getListData" ref="addOrUpdate"></addOrUpdate>
  </el-card>
</template>

<script>
  /**
   * Created by XiaoJie on 2019/4/10
   */
  import cookies from 'js-cookie'
  import addOrUpdate from './addOrUpdate.vue'
  import moduleMixin from '@/mixins/moduleMixin'

  export default {
    name: 'user',
    mixins: [moduleMixin],
    components: { addOrUpdate },
    data () {
      return {
        queryParams: {
          username: null
        },
        mixinConfig: {
          isBatchDelete: true,
          getListDataIsPage: true,
          getListDataURL: '/api/user/findPage',
          updateStatusURL: '/api/user/updateOne',
          deleteURL: '/api/user/remove'
        }
      }
    },
    created () {
      console.log('user')
    },
    methods: {
      _deleteHandle (id) {
        this.deleteHandle(id).then((result) => {
          if (result && id === this.$store.state.userInfo.id) {
            cookies.remove('token')
            this.$router.push('/login')
            this.$http.get('/user/signOut')
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .search-wrapper {
    display: inline-block;
    width: 300px;
  }
</style>
