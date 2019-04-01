<template>
  <div class="login-wrapper reset-element-ui">
    <div class="login-content">
      <div class="login-header">
        <h1 class="login-brand">人人微服务平台</h1>
      </div>
      <div class="login-main">
        <h3 class="login-title">登录
          <el-button class="fr language" type="text">
            <svg-icon icon="translate"/>
          </el-button>
        </h3>
        <el-form :model="loginForm" @keyup.enter.native="submit" ref="loginForm" status-icon>
          <el-form-item prop="userName" required size="default">
            <el-input maxlength="20"
                      placeholder="用户名"
                      size="default"
                      v-model="loginForm.userName">
              <span class="el-input__icon fs20px" slot="prefix">
               <svg-icon icon="user"/>
              </span>
            </el-input>
          </el-form-item>
          <el-form-item prop="password" required size="default">
            <el-input maxlength="20"
                      placeholder="密码"
                      show-password
                      size="default"
                      type="password"
                      v-model="loginForm.password">
              <span class="el-input__icon fs20px" slot="prefix">
                <svg-icon icon="lock"/>
              </span>
            </el-input>
          </el-form-item>
          <el-form-item prop="captcha" required size="default">
            <el-input @clear="$refs.captcha.focus()" class="w200px"
                      clearable
                      maxlength="4"
                      placeholder="验证码"
                      ref="captcha"
                      size="default"
                      v-model="loginForm.captcha">
              <span class="el-input__icon fs20px" slot="prefix">
                <svg-icon icon="safetycertificate"/>
              </span>
            </el-input>
            <span @click="refreshCaptcha" class="login-captcha cursor-pr fr">
              <img :src="captchaUrl" alt="验证码">
            </span>
          </el-form-item>
          <el-form-item size="default">
            <el-button @click="submit" class="w100" size="default" type="primary">
              <i class="el-icon-loading" v-show="isLoading"></i>&nbsp;登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="login-footer">
      <p>
        <span>参考于：</span>
        <a href="https://demo.cloud.renren.io/renren-cloud" target="_blank">人人开源</a>
        <a href="https://panjiachen.github.io/vue-element-admin/#/login" target="_blank">vue-element-admin</a>
      </p>
      <p>
        <svg-icon icon="github-fill"/>
        <span>项目地址：</span>
        <a href="https://github.com/yomojie" target="_blank">vue</a>
        <a href="https://github.com/yomojie/nodeJs" target="_blank">nodeJs</a>
        <span>欢迎查阅，希望能对你有所帮助</span>
      </p>
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

  export default {
    name: 'login',
    data () {
      return {
        uuId: getUUId(),
        isLoading: false,
        loginForm: {
          userName: '',
          password: '',
          captcha: ''
        }
      }
    },
    computed: {
      captchaUrl () {
        return this.$store.state.baseUrl + '/util/getCaptcha?' + this.uuId
      }
    },
    created () {
    },
    methods: {
      refreshCaptcha: debounce(function () {
        this.uuId = getUUId()
      }, 1000, { 'leading': true, 'trailing': false }),
      // 加密密码
      encrypt (key, plaintext) {
        let crypto = new JSEncrypt()
        crypto.setPublicKey(key)
        return crypto.encrypt(plaintext)
      },
      // 提交登录请求
      submitRequest ({ key }) {
        let params = Object.assign({}, this.loginForm)
        params.password = this.encrypt(key, params.password)
        this.$http.post('/user/signIn', params).then(({ ok, msg, token }) => {
          if (ok && token) {
            cookies.set('token', token, { expires: 1 })
            this.$router.replace('/')
          } else {
            this.refreshCaptcha()
            this.$message.error(msg)
          }
        })
      },
      // 登录事件
      submit: debounce(function () {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.$http.get('/util/getPublicKey').then(this.submitRequest)
          }
        })
      }, 1000, { 'leading': true, 'trailing': false })
    }
  }
</script>

<style lang="scss" scoped>
  .login-wrapper {
    height: 100%;

    &:before,
    &:after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: -1;
      content: "";
    }

    &:before {
      background-image: url(~@/assets/img/login_bg.jpg);
      background-size: cover;
    }

    &:after {
      background-color: rgba(38, 50, 56, .4);
    }
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
    border-radius: 2px;
    background-color: #fff;
    transition: all 0.3s ease 0s;

    &:hover {
      box-shadow: rgba(0, 0, 0, 0.31) 0 2px 12px 0;
    }

    .login-title {
      margin: 18px 0;
      padding-left: 20px;
      font-size: 18px;
      font-weight: 400;
      letter-spacing: 2px;
      text-align: center;
    }

    .login-captcha {
      min-width: 120px;
      font-size: 0;
      background-color: #bfbfc0;
      background: -webkit-linear-gradient(to right, #bfbfc0 0%, #f4f4f5 100%);
      background: -o-linear-gradient(to right, #bfbfc0 0%, #f4f4f5 100%);
      background: -moz-linear-gradient(to right, #bfbfc0 0%, #f4f4f5 100%);
      background: linear-gradient(to right, #bfbfc0 0%, #f4f4f5 100%);
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
      padding: 0 5px;
      color: rgba(255, 255, 255, .6);
    }
  }
</style>
