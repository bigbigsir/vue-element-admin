import './element-theme/index.css'
import './assets/css/index.scss'

import 'babel-polyfill'
import './icons'
import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import ElementUI from 'element-ui'

import http from './api/http.js'
import SvgIcon from './components/svg_icon/SvgIcon.vue'

Vue.use(http)
Vue.use(ElementUI, { size: 'medium', zIndex: 3000 })
Vue.component('svg-icon', SvgIcon)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
