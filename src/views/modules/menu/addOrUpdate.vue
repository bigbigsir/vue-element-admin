<template>
  <el-dialog
    @opened="dialogOpen"
    @closed="dialogClose"
    :visible.sync="visible"
    :title="formData.id ? $t('update') :$t('add')"
    custom-class="menu-dialog min-w-600px"
    :close-on-click-modal="false" :close-on-press-escape="false">
    <el-form :model="formData" :rules="formRules" ref="form" @keyup.enter.native="submitHandle()"
             v-loading="submitLoading" :validate-on-rule-change="false" label-width="auto">

      <el-form-item prop="label" :label="$t('menu.name')">
        <el-input v-model.trim="formData.label" :placeholder="$t('menu.name')" maxlength="20"></el-input>
      </el-form-item>

      <el-form-item prop="parentName" :label="$t('menu.parentName')">
        <el-input v-model="formData.parentName"
                  readonly class="cursor-pr"
                  :placeholder="$t('menu.parentName')"
                  v-popover:menuListPopover>
          <i v-show="formData.parentId !== null"
             @click.stop="setDefaultParent()" slot="suffix"
             class="el-icon-circle-close el-input__icon">
          </i>
        </el-input>
        <el-popover v-model="menuListVisible" ref="menuListPopover" placement="bottom-start" trigger="click">
          <el-tree
            :data="menuData"
            :props="{ label: 'label', children: 'children' }"
            node-key="id" accordion
            :highlight-current="true"
            :expand-on-click-node="false"
            @current-change="setParent">
          </el-tree>
        </el-popover>
      </el-form-item>

      <el-form-item prop="routerPath" :label="$t('menu.routePath')">
        <el-input v-model.trim="formData.routerPath" :placeholder="$t('menu.routePath')" maxlength="20"></el-input>
      </el-form-item>

      <el-form-item prop="resourceUrl" :label="$t('menu.resourceUrl')">
        <el-input v-model.trim="formData.resourceUrl" :placeholder="$t('menu.resourceUrl')" maxlength="100"></el-input>
      </el-form-item>

      <el-row>
        <el-col :span="12">
          <el-form-item prop="sort" :label="$t('menu.sort')">
            <el-input-number v-model="formData.sort" :min="1" :max="100"
                             :placeholder="$t('menu.sort')"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="icon" :label="$t('menu.icon')">
            <el-button @click="openSelectIcon" class="icon-wrapper">
              <svg-icon :icon="formData.icon"/>
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item prop="openMode" :label="$t('menu.openMode')" class="margin-b-0">
        <el-radio v-model="formData.openMode" label="tab">tab</el-radio>
        <el-radio v-model="formData.openMode" label="home">home</el-radio>
      </el-form-item>

    </el-form>
    <template slot="footer">
      <el-button @click="visible = false" type="text">{{ $t('cancel') }}</el-button>
      <el-button @click="submitHandle()" type="primary">{{ $t('confirm') }}</el-button>
    </template>
    <iconSelect @getIcon="getIcon" v-if="renderIconSelect" :showIconSelect.sync="showIconSelect"></iconSelect>
  </el-dialog>
</template>

<script>
  /**
   * Created by bigBigSir on 2019/4/5
   */
  import iconSelect from '@/components/iconSelect.vue'
  import debounce from 'lodash/debounce'

  export default {
    name: 'addOrUpdate',
    components: { iconSelect },
    props: {
      menuData: {
        type: Array,
        default () {
          return []
        }
      }
    },
    data () {
      return {
        visible: false,
        submitLoading: false,
        menuListVisible: false,
        renderIconSelect: false,
        showIconSelect: false,
        formData: {
          id: null,
          label: null,
          parentId: null,
          routerPath: null,
          resourceUrl: null,
          sort: 1,
          openMode: 'tab',
          icon: '',
          parentName: this.$t('menu.parentNameDefault')
        }
      }
    },
    computed: {
      formRules () {
        return {
          label: this.$rules({ type: 'required' }),
          parentName: this.$rules({ type: 'required' }),
          openMode: this.$rules({ type: 'required' }),
          routerPath: this.$rules({ type: 'noSpaces' }),
          resourceUrl: this.$rules({ type: 'noSpaces' })
        }
      }
    },
    methods: {
      // dialog打开回调
      dialogOpen () {
        if (this.formData.id) {
          let url = '/api/menu/findOne'
          let params = { id: this.formData.id }
          this.$http.get(url, params).then(({ ok, data, msg }) => {
            if (ok) {
              this.formData = Object.assign({}, this.formData, data)
              if (data.parentId) {
                this.formData.parentName = this.findParentName(data.parentId, this.menuData)
              }
            } else {
              this.$message.error(msg)
            }
          })
        }
      },
      // dialog关闭回调
      dialogClose () {
        this.formData.parentId = null
        this.$refs.form.resetFields()
      },
      // 提交表单
      submitHandle: debounce(function () {
        this.$refs.form.validate((valid) => {
          if (valid) {
            let url = `/api/menu/${this.formData.id ? 'updateOne' : 'add'}`
            let params = { ...this.formData }
            delete params.parentName
            this.submitLoading = true
            this.$http.post(url, params).then(({ ok, msg }) => {
              this.submitLoading = false
              if (ok) {
                this.$message({
                  message: this.$t('prompt.success'),
                  type: 'success',
                  duration: 500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshList')
                  }
                })
              } else {
                this.$message.error(msg)
              }
            })
          }
        })
      }, 1000, { 'leading': true, 'trailing': false }),
      // 设置为一级菜单
      setDefaultParent () {
        this.formData.parentId = null
        this.formData.parentName = this.$t('menu.parentNameDefault')
      },
      // 上级菜单树, 选中
      setParent (data) {
        this.formData.parentId = data.id
        this.formData.parentName = data.label
        this.menuListVisible = false
      },
      // 打开图标选择弹窗
      openSelectIcon () {
        this.renderIconSelect = true
        this.showIconSelect = true
      },
      // 选择icon后的回调
      getIcon (icon) {
        this.formData.icon = icon
        this.showIconSelect = false
      },
      // 查询上级菜单名称
      findParentName (parentId, menus) {
        let parentName = ''
        for (let i = menus.length; i--;) {
          if (parentId === menus[i].id) {
            parentName = menus[i].label
            break
          }
          if (menus[i].children && menus[i].children.length) {
            parentName = this.findParentName(parentId, menus[i].children)
          }
        }
        return parentName
      }
    }
  }
</script>

<style lang="scss">
  .menu-dialog {
    .icon-wrapper {
      padding: 8px;
      font-size: 18px;
    }

    .cursor-pr {
      input {
        cursor: pointer;
      }
    }

    .el-input__validateIcon {
      display: none;
    }
  }
</style>
