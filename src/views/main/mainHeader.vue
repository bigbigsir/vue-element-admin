<template>
  <header :class="{'follow-theme':headerFollowTheme}" class="main-header clearfix">
    <div class="header-brand bg-c-primary fl">
      <h1 v-if="isCollapse">
        {{$t('brand.miniName')}}
      </h1>
      <h1 v-else>{{$t('brand.name')}}</h1>
    </div>
    <ul class="header-nav clearfix">
      <li @click="toggleCollapse(!isCollapse)" class="header-nav-item fl">
        <svg-icon icon="indent" v-if="isCollapse"/>
        <svg-icon icon="outdent" v-else/>
      </li>
      <li class="header-nav-item fr">
        <el-dropdown @command="handleCommand" trigger="click" size="medium" placement="bottom">
          <div class="user-info clearfix">
            <span @click.stop="uploadAvatar" class="avatar-wrapper fl">
              <img alt="" :src="userAvatar">
            </span>
            <span class="fr">
              <span class="user-name">{{userInfo&&userInfo.username}}</span>
            <i class="icon-down el-icon-arrow-down"></i>
            </span>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logout">
              <svg-icon icon="logout"/>&nbsp;{{$t('logout')}}
            </el-dropdown-item>
            <el-dropdown-item command="changePassword">
              <svg-icon icon="unlock"/>&nbsp;{{$t('updatePassword.title')}}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </li>
      <li @click="toggleScreenFull" class="header-nav-item fr">
        <span class="trigger">
          <svg-icon icon="fullscreen"/>
        </span>
      </li>
      <li class="header-nav-item fr">
        <LanguageSelect>
          <svg-icon icon="translate"/>
        </LanguageSelect>
      </li>
      <li class="header-nav-item fr">
        <SizeSelect>
          <svg-icon icon="font-size"/>
        </SizeSelect>
      </li>
      <li class="header-nav-item fr">
        <ThemePicker>
          <svg-icon icon="skin"/>
        </ThemePicker>
      </li>
      <li @click="refreshRouter" class="header-nav-item fr">
        <span class="trigger">
          <svg-icon icon="reload"/>
        </span>
      </li>
    </ul>
    <input id="uploadAvatar" name="avatar" type="file" class="hidden">
    <changePassword v-if="renderChangePassword" :isChangePassword="true"
                    ref="changePassword" append-to-body>
    </changePassword>
  </header>
</template>

<script>
/**
   * Created by bigBigSir on 2019/3/28
   */
import cookies from 'js-cookie'
import screenFull from 'screenfull'
import { mapState, mapMutations } from 'vuex'
import SizeSelect from '@/components/SizeSelect.vue'
import ThemePicker from '@/components/ThemePicker.vue'
import LanguageSelect from '@/components/LanguageSelect.vue'
import changePassword from '../modules/user/addOrUpdate.vue'

export default {
  name: 'mainHeader',
  components: {
    SizeSelect,
    ThemePicker,
    LanguageSelect,
    changePassword
  },
  data () {
    return {
      renderChangePassword: false
    }
  },
  created () {
  },
  mounted () {
    const vm = this
    const file = document.getElementById('uploadAvatar')
    file.onchange = function () {
      vm.fileInputChangeHandle(this)
    }
  },
  computed: {
    ...mapState(['userInfo']),
    ...mapState('main', ['isCollapse', 'headerFollowTheme']),
    userAvatar () {
      if (this.userInfo && this.userInfo.photo) {
        return this.$store.state.baseUrl + this.userInfo.photo
      } else {
        return require('@/assets/img/avatar.png')
      }
    }
  },
  methods: {
    ...mapMutations('main', ['toggleCollapse', 'refreshRouter']),
    // 切换全屏
    toggleScreenFull () {
      if (screenFull.enabled) return screenFull.toggle(null)
      this.$message({
        message: '您的浏览器不支持此操作',
        type: 'warning',
        duration: 1000
      })
    },
    // 用户中心操作
    handleCommand (type) {
      this[type]()
    },
    // 退出登录
    logout () {
      const title = this.$t('prompt.title')
      const info = this.$t('prompt.info', {
        handle: this.$t('logout')
      })
      const confirmConfig = {
        confirmButtonText: this.$t('confirm'),
        cancelButtonText: this.$t('cancel'),
        type: 'warning'
      }
      this.$confirm(info, title, confirmConfig).then(() => {
        this.$http.get('/user/signOut').then(() => {
          cookies.remove('token')
          this.$router.push('/login')
        })
      }).catch(e => e)
    },
    // 修改密码
    changePassword () {
      this.renderChangePassword = true
      this.$nextTick(() => {
        this.$refs.changePassword.visible = true
      })
    },
    // 上传头像
    uploadAvatar () {
      const input = document.getElementById('uploadAvatar')
      input.click()
    },
    // 文件选择框change事件
    fileInputChangeHandle (fileInput) {
      let formData
      const image = fileInput.files[0]
      if (!image) return
      const isImg = image.type === 'image/jpeg' || image.type === 'image/png'
      const isLt2M = image.size / 1024 / 1024 < 2
      if (!isImg) {
        return this.$message.error(this.$t('validate.format', { attr: this.$t('module.image') }))
      }
      if (!isLt2M) {
        return this.$message.error(this.$t('validate.imageSize', { size: '2MB' }))
      }
      formData = new FormData()
      formData.append(fileInput.name, image)
      this.uploadRequest(formData)
    },
    // 上传头像请求
    uploadRequest (formData) {
      this.$http.post('/api/file/upload', formData).then(({ ok, data, msg }) => {
        if (ok) {
          if (this.userInfo.photo) {
            // 删除原头像文件及数据
            this.$http.delete('/api/file/removeFile', { url: this.userInfo.photo })
          }
          // 更新用户头像链接
          return this.$http.post('/api/user/updateOne', {
            id: this.userInfo.id,
            photo: (data && data[0].url) || null
          })
        } else {
          return Promise.reject(msg)
        }
      }).then((ok, msg) => {
        if (ok) {
          // 刷新用户数据
          return this.$store.dispatch('getUserInfo')
        } else {
          return Promise.reject(msg)
        }
      }).then(() => {
        this.$message.success(this.$t('prompt.success'))
      }).catch(err => {
        this.$message.error(err)
      })
    }
  }
}
</script>
