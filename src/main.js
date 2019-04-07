import './element-ui/index.css'
import './assets/css/index.scss'

import 'babel-polyfill'
import './icons'
import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import ElementUI from 'element-ui'

import i18n from './language'
import http from './api/http.js'
import SvgIcon from './components/SvgIcon.vue'

Vue.use(http)
Vue.component('svg-icon', SvgIcon)
Vue.use(ElementUI, {
  size: localStorage.getItem('size') || 'medium',
  i18n: (key, value) => i18n.t(key, value)
})

Vue.config.productionTip = false

new Vue({
  i18n,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
