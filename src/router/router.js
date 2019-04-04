import Vue from 'vue'
import Router from 'vue-router'
import main from '../views/main/main.vue'
import cookies from 'js-cookie'
// import store from '../store/store'

Vue.use(Router)

const router = new Router({
  // scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      name: 'sys_main',
      component: main,
      redirect: { name: 'sys_home' },
      children: [
        {
          path: '/home',
          name: 'sys_home',
          meta: {
            isTab: true,
            label: '首页'
          },
          component: () => import(/* webpackChunkName: "home" */'../views/modules/home.vue')
        },
        {
          path: '/menu',
          name: 'sys_menu',
          meta: {
            'id': '5b436b2b571a52242c5c488e',
            isTab: true,
            label: '菜单管理'
          },
          component: () => import(/* webpackChunkName: "menu" */'../views/modules/menu.vue')
        },
        {
          path: '/svgIcon',
          name: 'sys_svgIcon',
          meta: {
            'id': '5b436c03571a52242c5c488f',
            isTab: true,
            label: '图标管理'
          },
          component: () => import(/* webpackChunkName: "svgIcon" */'../views/modules/svgIcon.vue')
        }
      ]
    }, {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '../views/pages/login.vue')
    }, {
      path: '*',
      component: () => import(/* webpackChunkName: "page404" */ '../views/pages/404.vue')
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
