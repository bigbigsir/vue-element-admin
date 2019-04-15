import './element-ui/index.css'
import './assets/css/index.scss'

import 'babel-polyfill'
import './icons'
import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import ElementUI from 'element-ui'
import moment from 'moment'

import i18n from './language'
import http from './api/http'
import rules from './utils/rules'
import SvgIcon from './components/SvgIcon.vue'

Vue.config.productionTip = false
Vue.use(http)
Vue.use(rules)
Vue.use(ElementUI, {
  size: localStorage.getItem('size') || 'medium',
  i18n: (key, value) => i18n.t(key, value)
})
Vue.component('svg-icon', SvgIcon)
Vue.filter('moment', function (value, formatString) {
  formatString = formatString || 'YYYY-MM-DD HH:mm:ss'
  if (!value) return null
  return moment(value).format(formatString)
})

new Vue({
  i18n,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
