/**
 * Created by bigBigSir on 2019/4/13
 * @description            常用ElementUi表单验证
 * @param  {Array} options 接受一个或多个规则的配置
 * type    {Stying}        规则名称
 * message {Stying}        如果配置中有该字段就覆盖验证中的默认提示消息
 * trigger {Stying}        如果配置中有该字段就覆盖默认触发方式，默认为 blur
 * params  {Object}        某些规则需要外界的参数来制定，比如字符最大长度
 * */
'use strict'

const trigger = 'blur'

const createRule = function (options = []) {
  // 常用规则
  const rules = {
    // 必填
    required: { required: true, message: this.$t('validate.required'), trigger },
    // 用户名
    username: {
      message: this.$t('validate.format', { 'attr': this.$t('module.username') }),
      regex: /^[A-z][\w]{3,20}$/,
      validator (rule, value, callback) {
        if (this.regex.test(value)) {
          callback()
        } else {
          callback(new Error(rule.message))
        }
      }
    },
    // 密码
    password: {
      message: this.$t('validate.format', { 'attr': this.$t('module.password') }),
      regex: /^[\w]{6,20}$/,
      validator (rule, value, callback) {
        if (this.regex.test(value)) {
          callback()
        } else {
          callback(new Error(rule.message))
        }
      }
    },
    // 确认密码
    confirmPassword: {
      message: this.$t('validate.passwordMismatch'),
      validator: (rule, value, callback) => {
        if (value === this.formData.password) {
          callback()
        } else {
          callback(new Error(rule.message))
        }
      }
    },
    // 邮箱
    email: {
      message: this.$t('validate.format', { 'attr': this.$t('module.email') }),
      regex: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,
      validator (rule, value, callback) {
        if (this.regex.test(value)) {
          callback()
        } else {
          callback(new Error(rule.message))
        }
      }
    },
    // 手机号
    mobile: {
      message: this.$t('validate.format', { 'attr': this.$t('module.mobile') }),
      regex: /^1[34578]\d{9}$/,
      validator (rule, value, callback) {
        if (this.regex.test(value)) {
          callback()
        } else {
          callback(new Error(rule.message))
        }
      }
    },
    // 最长长度
    maxLength: {
      validator: (rule, value, callback) => {
        rule.message = rule.message || this.$t('validate.maxLength', { 'maxLength': rule.params.max })
        if (value.length <= rule.params.max) {
          callback()
        } else {
          callback(new Error(rule.message))
        }
      }
    }
  }
  const result = []
  options = Array.isArray(options) ? options : [options]
  options.forEach(item => {
    if (item.params) rules[item.type].params = item.params
    if (item.message) rules[item.type].message = item.message
    rules[item.type].trigger = item.trigger || trigger
    result.push(rules[item.type])
  })
  return result
}

const install = function (Vue) {
  Object.defineProperties(Vue.prototype, {
    $rules: {
      get () {
        return createRule
      },
      enumerable: false, // 不可枚举
      configurable: false // 不可重写
    }
  })
}

export default install
