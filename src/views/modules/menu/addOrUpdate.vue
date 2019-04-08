<template>
  <el-dialog
    @open="dialogOpen"
    @closed="dialogClose"
    :visible.sync="visible"
    :title="formData.id ? $t('update') :$t('add')"
    custom-class="menu-add-dialog"
    :close-on-click-modal="false" :close-on-press-escape="false">
    <el-form :model="formData" @keyup.enter.native="submitForm()" ref="form" label-width="90px">
      <el-form-item prop="label" label="菜单名称:" required>
        <el-input v-model="formData.label"></el-input>
      </el-form-item>
      <el-form-item prop="parentName" label="上级菜单:" required>
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
        <el-input v-model="formData.parentName"
                  readonly class="cursor-pr"
                  v-popover:menuListPopover
                  :placeholder="$t('menu.parentName')">
          <i v-show="formData.parentId !== null"
             @click.stop="setDefaultParent()" slot="suffix"
             class="el-icon-circle-close el-input__icon">
          </i>
        </el-input>
      </el-form-item>
      <el-form-item prop="routerPath" label="路由地址:">
        <el-input v-model="formData.routerPath"></el-input>
      </el-form-item>
      <el-form-item prop="resourceUrl" label="资源地址:">
        <el-input v-model="formData.resourceUrl"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item prop="sort" label="排序:" required>
            <el-input-number v-model="formData.sort" :min="1" :max="100"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="icon" label="菜单图标:">
            <el-button @click="openSelectIcon" class="icon-wrapper">
              <svg-icon :icon="formData.icon"/>
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item prop="openMode" label="打开方式:" required>
        <el-radio v-model="formData.openMode" label="tab">tab</el-radio>
        <el-radio v-model="formData.openMode" label="home">home</el-radio>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <el-button @click="visible = false" type="text">{{ $t('cancel') }}</el-button>
      <el-button @click="submitForm()" type="primary">{{ $t('confirm') }}</el-button>
    </template>
    <iconSelect @getIcon="getIcon" v-if="renderIconSelect" :showIconSelect.sync="showIconSelect"></iconSelect>
  </el-dialog>
</template>

<script>
  /**
   * Created by XiaoJie on 2019/4/5
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
        menuListVisible: false,
        renderIconSelect: false,
        showIconSelect: false,
        formData: {
          id: null,
          label: '',
          parentId: null,
          routerPath: '',
          resourceUrl: '',
          sort: 1,
          openMode: 'tab',
          icon: '',
          parentName: '一级菜单'
        }
      }
    },
    methods: {
      // dialog打开回调
      dialogOpen () {
        if (this.formData.id) {
          let url = '/api/menu/findOne'
          let params = { id: this.formData.id }
          this.$http.get(url, params).then(({ ok, data }) => {
            if (ok) {
              this.formData = Object.assign(this.formData, data)
              if (data.parentId) {
                this.formData.parentName = this.findParentName(this.formData.parentId, this.menuData)
              }
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
      submitForm: debounce(function () {
        this.$refs.form.validate((valid) => {
          if (valid) {
            let url = `/api/menu/${this.formData.id ? 'updateOne' : 'add'}`
            let params = { ...this.formData }
            delete params.parentName
            this.$http.post(url, params).then(({ ok }) => {
              if (!ok) return
              this.$message({
                message: this.$t('prompt.success'),
                type: 'success',
                duration: 500,
                onClose: () => {
                  this.visible = false
                  this.$emit('getMenuData')
                }
              })
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
            parentName = this.findParentName(menus[i].children, parentId)
          }
        }
        return parentName
      }
    }
  }
</script>

<style lang="scss">
  .menu-add-dialog {
    min-width: 600px;

    .icon-wrapper {
      padding: 8px;
      font-size: 18px;
    }

    .cursor-pr {
      input {
        cursor: pointer;
      }
    }
  }
</style>
