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
          <div class="user-info">
            <img alt="" :src="userAvatar">
            <span class="user-name">{{userInfo&&userInfo['userName']}}</span>
            <i class="icon-down el-icon-arrow-down"></i>
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
  </header>
</template>

<script>
  /**
   * Created by XiaoJie on 2019/3/28
   */
  import cookies from 'js-cookie'
  import screenFull from 'screenfull'
  import { mapState, mapMutations } from 'vuex'
  import SizeSelect from '@/components/SizeSelect.vue'
  import ThemePicker from '@/components/ThemePicker.vue'
  import LanguageSelect from '@/components/LanguageSelect.vue'

  export default {
    name: 'mainHeader',
    components: {
      SizeSelect,
      ThemePicker,
      LanguageSelect
    },
    data () {
      return {}
    },
    created () {
    },
    computed: {
      ...mapState('main', ['userInfo', 'isCollapse', 'headerFollowTheme']),
      userAvatar () {
        return (this.userInfo && this.userInfo['photo']) || require('@/assets/img/avatar.png')
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
        let title = this.$t('prompt.title')
        let info = this.$t('prompt.info', {
          'handle': this.$t('logout')
        })
        let confirmConfig = {
          confirmButtonText: this.$t('confirm'),
          cancelButtonText: this.$t('cancel'),
          type: 'warning'
        }
        this.$confirm(info, title, confirmConfig).then(() => {
          this.$http.get('/user/signOut').then(({ ok, msg }) => {
            if (ok) {
              cookies.remove('token')
              this.$router.push('/login')
            } else {
              this.$message.error(msg)
            }
          })

        }).catch(e => e)
      },
      // 修改密码
      changePassword () {
      }
    }
  }
</script>
