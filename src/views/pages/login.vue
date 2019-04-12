<template>
  <div class="login-container reset-element-ui">
    <div class="login-inner">
      <div class="login-content">
        <div class="login-header">
          <h1 class="login-brand">{{ $t('brand.name') }}</h1>
        </div>
        <div class="login-main b-r-small b-s-dark">
          <h3 class="login-title">{{ $t('login.title') }}
            <LanguageSelect>
              <el-button class="language" type="text">
                <svg-icon icon="translate"/>
              </el-button>
            </LanguageSelect>
          </h3>
          <el-form :model="formData" @keyup.enter.native="submitHandle" :rules="formRules"
                   :validate-on-rule-change="false" ref="form" status-icon>
            <el-form-item prop="username" size="default">
              <el-input maxlength="20"
                        :placeholder="$t('login.username')"
                        size="default"
                        v-model="formData.username">
              <span class="el-input__icon fs18px" slot="prefix">
               <svg-icon icon="user"/>
              </span>
              </el-input>
            </el-form-item>
            <el-form-item prop="password" size="default">
              <el-input maxlength="20"
                        :placeholder="$t('login.password')"
                        show-password
                        size="default"
                        type="password"
                        v-model="formData.password">
              <span class="el-input__icon fs18px" slot="prefix">
                <svg-icon icon="lock"/>
              </span>
              </el-input>
            </el-form-item>
            <el-form-item prop="captcha" size="default">
              <el-input @clear="$refs.captcha.focus()" class="w200px"
                        clearable
                        maxlength="4"
                        :placeholder="$t('login.captcha')"
                        ref="captcha"
                        size="default"
                        v-model="formData.captcha">
              <span class="el-input__icon fs18px" slot="prefix">
                <svg-icon icon="safetycertificate"/>
              </span>
              </el-input>
              <span @click="refreshCaptcha" class="login-captcha cursor-pr fr">
              <img :src="captchaUrl" :alt="$t('login.captcha')">
            </span>
            </el-form-item>
            <el-form-item size="default">
              <el-button @click="submitHandle"
                         :loading="submitLoading"
                         class="w100" size="default"
                         type="primary">
                {{ $t('login.title') }}
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="login-footer">
        <p>
          <svg-icon icon="github-fill"/>
          <a href="https://github.com/yomojie" target="_blank">vue-element-admin</a>
          <a href="https://github.com/yomojie/nodeJs" target="_blank">nodeJs</a>
        </p>
        <p>
          <a href="http://opensource.org/licenses/MIT" rel="nofollow" target="_blank">MIT</a>
          <span>Copyright (c) 2019-present yomojie</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  /**
   * Created by XiaoJie on 2019/3/26
   */
  import cookies from 'js-cookie'
  import JSEncrypt from 'jsencrypt'
  import debounce from 'lodash/debounce'
  import { getUUId } from '../../util/util'
  import LanguageSelect from '@/components/LanguageSelect.vue'

  export default {
    name: 'login',
    components: {
      LanguageSelect
    },
    // 进入页面的路由拦截
    beforeRouteEnter (to, from, next) {
      let nextTarget = {
        query: { ...from.query },
        params: { ...from.params }
      }
      if (from.name) {
        nextTarget.name = from.name
      } else {
        nextTarget.path = from.path
      }
      if (cookies.get('token')) {
        return next(nextTarget)
      }
      next(vm => {
        vm.nextTarget = nextTarget
      })
    },
    data () {
      return {
        nextTarget: '/',
        submitLoading: false,
        formData: {
          uuid: getUUId(),
          username: '',
          password: '',
          captcha: ''
        }
      }
    },
    computed: {
      captchaUrl () {
        return this.$store.state.baseUrl + '/util/getCaptcha?uuid=' + this.formData.uuid
      },
      formRules () {
        let required = { required: true, message: this.$t('validate.required'), trigger: ['blur'] }
        return {
          username: [required],
          password: [required],
          captcha: [required]
        }
      }
    },
    created () {
      this.$store.commit('setUserInfo', null)
    },
    methods: {
      // 刷新验证码
      refreshCaptcha: debounce(function () {
        this.formData.uuid = getUUId()
      }, 1000, { 'leading': true, 'trailing': false }),
      // 加密密码
      encrypt (key, plaintext) {
        let crypto = new JSEncrypt()
        crypto.setPublicKey(key)
        return crypto.encrypt(plaintext)
      },
      // 提交登录请求
      submitForm (key) {
        let params = { ...this.formData }
        params.password = this.encrypt(key, params.password)
        return this.$http.post('/user/signIn', params).then(({ ok, msg, token }) => {
          if (ok && token) {
            cookies.set('token', token, { expires: 1 })
            this.$router.replace(this.nextTarget)
          } else {
            this.refreshCaptcha()
            this.$message.error(msg)
            return Promise.reject(msg)
          }
        })
      },
      // 登录事件
      submitHandle: debounce(function () {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.submitLoading = true
            this.$http.get('/util/getPublicKey').then(({ ok, key, msg }) => {
              if (ok) {
                return this.submitForm(key)
              } else {
                this.$message.error(msg)
                return Promise.reject(msg)
              }
            }).catch(() => {
              this.submitLoading = false
            })
          }
        })
      }, 1000, { 'leading': true, 'trailing': false })
    }
  }
</script>

<style lang="scss" scoped>
  .login-container {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #F1F4F5;
    background-image: url(~@/assets/img/login_bg.jpg);
    background-size: cover;
  }

  .login-inner {
    height: 100%;
    background-color: rgba(38, 50, 56, 0.4);
  }

  .login-content {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -200px;
    width: 400px;
    transform: translateY(-60%);
  }

  .login-header {
    margin-bottom: 35px;
    font-weight: 400;
    letter-spacing: 2px;
    color: #fff;
    text-align: center;
    text-transform: uppercase;

    .login-brand {
      margin: 0;
      font-size: 40px;
      font-weight: 400;
    }
  }

  .login-main {
    padding: 20px 30px;
    background-color: #fff;

    .login-title {
      margin: 18px 0;
      padding-left: 22px;
      font-size: 18px;
      font-weight: 400;
      letter-spacing: 2px;
      text-align: center;

      & > div {
        float: right;
      }
    }

    .login-captcha {
      min-width: 120px;
      font-size: 0;
      background-color: #c8c8c9;
    }

    .language {
      padding: 0;
      font-size: 20px;
    }
  }

  .login-footer {
    position: absolute;
    left: 50%;
    bottom: 0;
    margin-left: -230px;
    width: 460px;
    padding: 20px 0;
    text-align: center;
    color: rgba(255, 255, 255, .6);

    p {
      margin: 10px 0;
    }

    a {
      padding: 0 10px;
    }
  }
</style>
