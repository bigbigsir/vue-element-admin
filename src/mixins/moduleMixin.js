// import qs from 'qs'

const moduleMixin = {
  data () {
    return {
      // 配置属性
      mixinConfig: {
        activatedAutoRequest: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        getListDataURL: null, // 数据列表接口，API地址
        getListDataIsPage: false, // 数据列表接口，是否需要分页？
        deleteURL: null, // 删除接口，API地址
        isBatchDelete: false, // 删除接口，是否需要批量？
        batchDeleteKey: 'id', // 删除接口，批量状态下由那个key进行标记操作？比如：pid，uid...
        getDetailsURL: null, // 数据单个详情接口，API地址
        updateStatusURL: null, // 改变状态， API地址
        updateSortURL: null, // 改变排序， API地址
        exportURL: null // 导出接口，API地址
      },
      // 默认属性
      listData: [], // 列表数据
      queryParams: {}, // 查询条件
      page: 1, // 当前页码
      pageSize: 10, // 每页数
      total: 0, // 总条数
      order: null, // 排序顺序，asc | desc
      orderField: null, // 排序字段
      getDataLoading: false, // 获取数据，loading状态
      isRenderDialog: false, // 新增|更新，弹窗是否渲染
      listSelections: [] // 列表数据，多选项
    }
  },
  created () {
    if (this.mixinConfig.activatedAutoRequest) {
      this.getListData()
    }
  },
  methods: {
    // 获取数据列表
    getListData () {
      let url = this.mixinConfig.getListDataURL
      let params = {
        order: this.order,
        orderField: this.orderField,
        page: this.mixinConfig.getListDataIsPage ? this.page : null,
        pageSize: this.mixinConfig.getListDataIsPage ? this.pageSize : null,
        ...this.queryParams
      }
      if (!url) return
      this.getDataLoading = true
      for (let key in params) {
        if (!params[key]) delete params[key]
      }
      return this.$http.get(url, params).then(({ ok, data, msg }) => {
        this.getDataLoading = false
        if (ok) {
          this.listData = this.mixinConfig.getListDataIsPage ? (data.rows ? data.rows : data) : data
          this.total = this.mixinConfig.getListDataIsPage ? data.total : 0
          this.getListDataAfter(this.listData)
        } else {
          this.$message.error(msg)
          return Promise.reject(msg)
        }
        return data
      }).catch(() => {
        this.getDataLoading = false
      })
    },
    // 选择项发生变化时事件处理
    selectionChangeHandle (rows) {
      this.listSelections = rows
    },
    // 每页条数发生变化时事件处理
    handlePageSizeChange (pageSize) {
      this.page = (this.total / pageSize >= this.page) ? this.page : 0
      this.pageSize = pageSize
      this.getListData()
    },
    // 当前页发生变化时事件处理
    handleCurrentPageChange (page) {
      this.page = page
      this.getListData()
    },
    // 新增|修改 id，打开弹窗
    addOrUpdateHandle (id = null) {
      this.isRenderDialog = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.visible = true
        this.$refs.addOrUpdate.formData.id = id
      })
    },
    // 删除数据
    deleteHandle (id = null, key = 'id') {
      let title = this.$t('prompt.title')
      let info = this.$t('prompt.info', {
        'handle': this.$t('delete')
      })
      let confirmConfig = {
        confirmButtonText: this.$t('confirm'),
        cancelButtonText: this.$t('cancel'),
        type: 'warning'
      }
      let url = this.mixinConfig.deleteURL
      if (!url) return
      if (!id && this.mixinConfig.isBatchDelete && !this.listSelections.length) {
        return this.$message({
          message: this.$t('prompt.deleteSelect'),
          type: 'warning',
          duration: 1000
        })
      }
      id = this.mixinConfig.isBatchDelete ? this.listSelections.map(item => item[this.mixinConfig.batchDeleteKey]) : id
      this.$confirm(info, title, confirmConfig).then(() => {
        this.$http.delete(url, { [key]: id }).then(({ ok, msg }) => {
          if (ok) {
            this.$message({
              message: this.$t('prompt.success'),
              type: 'success',
              duration: 1000,
              onClose: () => this.getListData()
            })
          } else {
            this.$message.error(msg)
          }
        }).catch(() => null)
      }).catch(() => null)
    },
    // 更新状态
    updateStatus (idKey, idVal, statusKey, statusVal, method = 'put') {
      let title = this.$t('prompt.title')
      let info = this.$t('prompt.info', {
        'handle': this.$t('update')
      })
      let confirmConfig = {
        confirmButtonText: this.$t('confirm'),
        cancelButtonText: this.$t('cancel'),
        type: 'warning'
      }
      let url = this.mixinConfig.updateStatusURL
      let params = {
        [idKey]: idVal,
        [statusKey]: statusVal
      }
      if (!url) return
      this.$confirm(info, title, confirmConfig).then(() => {
        this.$http[method](url, params).then(({ ok, msg }) => {
          if (ok) {
            this.$message({
              message: this.$t('prompt.success'),
              type: 'success',
              duration: 1000,
              showClose: true,
              onClose: () => {
                this.getListData()
              }
            })
          } else {
            this.$message.error(msg)
          }
        }).catch(() => this.getListData())
      }).catch(() => this.getListData())
    },
    // 更新排序
    updateSort (idKey, idVal, sortKey, sortVal, method = 'put') {
      let url = this.mixinConfig.updateSortURL
      let params = {
        [idKey]: idVal,
        [sortKey]: sortVal
      }
      if (!url) return
      this.$http[method](url, params).then(({ ok, msg }) => {
        if (ok) {
          this.$message({
            message: this.$t('prompt.success'),
            type: 'success',
            duration: 1000,
            showClose: true,
            onClose: () => {
              this.getListData()
            }
          })
        } else {
          this.$message.error(msg)
        }
      }).catch(() => this.getListData())
    },
    // 排序变化时事件方法
    sortChangeHandle (data) {
      if (this.order !== 'asc' || this.order !== 'desc' || !this.orderField) return
      this.getListData()
    },
    // 数据请求成功之后的回调
    getListDataAfter () {
      return null
    }
  }
}

export default moduleMixin
