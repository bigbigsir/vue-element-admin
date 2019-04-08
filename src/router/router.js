import Vue from 'vue'
import Router from 'vue-router'
import main from '../views/main/main.vue'
import cookies from 'js-cookie'
import store from '../store/store'
import { isURL } from '@/util/util'

Vue.use(Router)

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
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
            id: null,
            icon: 'home',
            label: '首页',
            openMode: 'tab'
          },
          component: () => import(/* webpackChunkName: "home" */'../views/modules/home.vue')
        }
      ]
    }, {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '../views/pages/login.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (cookies.get('token')) {
    if (store.state.addRouterIsComplete) return next()
    Vue.prototype['$http'].get('/api/menu/tree').then(({ ok, data }) => {
      if (ok) {
        store.state.addRouterIsComplete = true
        addRouter(data)
        next({ ...to, replace: true })
      }
    })
  } else if (to.name === 'login') {
    next()
  } else {
    next({ name: 'login' })
  }
})

export default router

// 设置动态路由
function addRouter (menus) {
  let routers = []
  menus.forEach(menu => {
    recursionPushRoute(menu, routers)
  })
  router.addRoutes([
    {
      path: '/',
      name: 'main-dynamic-route',
      component: main,
      redirect: { name: 'sys_home' },
      children: routers
    }, {
      path: '*',
      component: () => import(/* webpackChunkName: "page404" */ '../views/pages/404.vue')
    }
  ])
}

// 组装路由数据
function recursionPushRoute (menu, routers) {
  let route
  if (menu.routerPath && menu.resourceUrl) {
    route = {
      path: menu.routerPath,
      name: menu.routerPath,
      meta: {
        id: menu.id,
        icon: menu.icon,
        label: menu.label,
        openMode: menu.openMode
      }
    }
    if (isURL(menu.resourceUrl)) {
      route.meta.isIframe = true
      route.meta.resourceUrl = menu.resourceUrl
    } else {
      route.component = () => import(`@/${menu.resourceUrl.replace(/^src\//, '')}`)
    }
    routers.push(route)
  }
  if (menu.children && menu.children.length) {
    menu.children.forEach(item => recursionPushRoute(item, routers))
  }
}
