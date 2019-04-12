<template>
  <el-dialog
    v-bind="$attrs"
    @opened="dialogOpen"
    @closed="dialogClose"
    :visible.sync="visible"
    :title="formData.id ? $t('update') :$t('add')"
    custom-class="user-dialog min-w-600px"
    :close-on-click-modal="false" :close-on-press-escape="false">
    <el-form :model="formData" :rules="formRules" ref="form" @keyup.enter.native="submitHandle()"
             v-loading="submitLoading" :validate-on-rule-change="false" label-width="auto">
      <el-form-item v-if="isChangePassword" label-width='0'>
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar" alt="">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item prop="username" :label="$t('module.username')">
        <el-input v-model="formData.username" :placeholder="$t('module.username')" :readonly="!!formData.id"
                  maxlength="30"></el-input>
      </el-form-item>

      <el-form-item prop="originalPassword" :label="$t('module.originalPassword')" v-if="isChangePassword">
        <el-input v-model="formData.originalPassword" :placeholder="$t('module.originalPassword')"
                  maxlength="30"></el-input>
      </el-form-item>

      <el-form-item prop="password" :label="$t('module.password')"
                    v-if="isChangePassword||!formData.id">
        <el-input v-model="formData.password" :placeholder="$t('module.password')" maxlength="30"></el-input>
      </el-form-item>

      <el-form-item prop="confirmPassword" :label="$t('module.confirmPassword')"
                    v-if="isChangePassword||!formData.id">
        <el-input v-model="formData.confirmPassword" :placeholder="$t('module.confirmPassword')"
                  maxlength="30"></el-input>
      </el-form-item>

      <el-form-item prop="realName" :label="$t('module.realName')">
        <el-input v-model="formData.realName" :placeholder="$t('module.realName')" maxlength="30"></el-input>
      </el-form-item>

      <el-form-item prop="gender" :label="$t('module.gender')">
        <el-radio v-model="formData.gender" label="1">{{$t('gender.gender_1')}}</el-radio>
        <el-radio v-model="formData.gender" label="2">{{$t('gender.gender_2')}}</el-radio>
        <el-radio v-model="formData.gender" label="0">{{$t('gender.gender_0')}}</el-radio>
      </el-form-item>

      <el-form-item prop="email" :label="$t('module.email')">
        <el-input v-model="formData.email" :placeholder="$t('module.email')" maxlength="30"></el-input>
      </el-form-item>

      <el-form-item prop="mobile" :label="$t('module.mobile')">
        <el-input v-model="formData.mobile" :placeholder="$t('module.mobile')" maxlength="30"></el-input>
      </el-form-item>

      <el-form-item prop="status" :label="$t('module.status')" v-if="!isChangePassword" class="margin-b-0">
        <el-radio v-model="formData.status" label="1">{{$t('module.enable')}}</el-radio>
        <el-radio v-model="formData.status" label="0">{{$t('module.disable')}}</el-radio>
      </el-form-item>

    </el-form>
    <template slot="footer">
      <el-button @click="visible = false" type="text">{{ $t('cancel') }}</el-button>
      <el-button @click="submitHandle()" type="primary">{{ $t('confirm') }}</el-button>
    </template>
  </el-dialog>
</template>

<script>
  /**
   * Created by XiaoJie on 2019/4/5
   */
  import cookies from 'js-cookie'
  import JSEncrypt from 'jsencrypt'
  import debounce from 'lodash/debounce'

  export default {
    name: 'addOrUpdate',
    props: {
      isChangePassword: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        imageUrl: null,
        visible: false,
        submitLoading: false,
        formData: {
          id: null,
          username: null,
          originalPassword: null,
          password: null,
          confirmPassword: null,
          realName: null,
          gender: '1',
          email: null,
          mobile: null,
          status: '1'
        }
      }
    },
    computed: {
      formRules () {
        let required = { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        return {
          username: [required],
          originalPassword: [required],
          password: [required],
          confirmPassword: [required],
          realName: [required],
          gender: [required],
          email: [required],
          mobile: [required],
          status: [required]
        }
      }
    },
    methods: {
      // dialog打开回调
      dialogOpen () {
        if (this.isChangePassword) {
          this.formData = { ...this.$store.state.userInfo }
        } else if (this.formData.id) {
          let url = '/api/user/findOne'
          let params = { id: this.formData.id }
          this.$http.get(url, params).then(({ ok, data, msg }) => {
            if (ok) {
              delete data['createTime']
              this.formData = { ...this.formData, ...data }
            } else {
              this.$message.error(msg)
            }
          })
        }
      },
      // dialog关闭回调
      dialogClose () {
        this.$refs.form.resetFields()
      },
      // 加密密码
      encrypt (key, plaintext) {
        let crypto = new JSEncrypt()
        crypto.setPublicKey(key)
        return crypto.encrypt(plaintext)
      },
      // 提交事件
      submitHandle: debounce(function () {
        this.$refs.form.validate((valid) => {
          if (valid) {
            let params = { ...this.formData }
            delete params.confirmPassword
            delete params.originalPassword
            this.submitLoading = true
            this.formatParam(params).catch((msg) => {
              this.$message.error(msg)
              this.submitLoading = false
            })
          }
        })
      }, 1000, { 'leading': true, 'trailing': false }),
      // 格式化参数
      formatParam (params) {
        let url
        if (this.formData.id && !this.isChangePassword) { // 修改用户信息
          url = '/api/user/updateOne'
          delete params.password
          return this.submitForm(url, params)
        }
        return this.$http.get('/util/getPublicKey').then(({ ok, key, msg }) => {
          if (ok && key) {
            params.password = this.encrypt(key, params.password)
            if (this.isChangePassword) { // 修改密码，用户信息
              url = '/user/changePassword'
              params.originalPassword = this.encrypt(key, this.formData.originalPassword)
            } else { // 添加用户
              url = '/user/signUp'
            }
            return this.submitForm(url, params)
          } else {
            return Promise.reject(msg)
          }
        })
      },
      // 提交表单
      submitForm (url, params) {
        return this.$http.post(url, params).then(({ ok, msg }) => {
          this.submitLoading = false
          if (ok) {
            if (this.isChangePassword) {
              return this.$http.get('/user/signOut').then(() => {
                let title = this.$t('prompt.title')
                let info = this.$t('prompt.success') + ',' + this.$t('prompt.restartLogin')
                let confirmConfig = {
                  type: 'success',
                  showClose: false,
                  confirmButtonText: this.$t('confirm')
                }
                cookies.remove('token')
                this.$nextTick(() => {
                  this.visible = false
                })
                return this.$alert(info, title, confirmConfig)
              }).then(() => {
                this.$router.push('login')
              })
            }
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
            return Promise.reject(msg)
          }
        })
      },
      handleAvatarSuccess (res, file) {
        this.imageUrl = URL.createObjectURL(file.raw)
      },
      beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      }
    }
  }
</script>

<style lang="scss">
  .user-dialog {
    .el-dialog__body {
      padding-top: 0;
    }
  }

  .avatar-uploader {
    overflow: hidden;
    text-align: center;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }

  .avatar {
    width: 80px;
    height: 80px;
    display: block;
  }
</style>
