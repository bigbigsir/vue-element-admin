import Vue from 'vue'
import Router from 'vue-router'
import main from '../views/main/main.vue'
import cookies from 'js-cookie'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: main,
      redirect: { name: 'home' },
      children: [
        {
          path: '/home',
          component: () => import(/* webpackChunkName: "home" */'../views/modules/home.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '../views/pages/login.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (cookies.get('token') || to.name === 'login') {
    next()
  } else {
    next({ name: 'login' })
  }
})

export default router
