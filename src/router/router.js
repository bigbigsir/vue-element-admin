import Vue from 'vue'
import VueRouter from 'vue-router'
import cookies from 'js-cookie'
import store from '../store/store'
import { isURL } from '@/utils/util'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'sys_main',
    component: () => import(/* webpackChunkName: "main" */ '../views/main/main.vue'),
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
      }, {
        path: '/_menu',
        name: 'sys_menu',
        meta: {
          id: null,
          icon: 'menu',
          label: '菜单管理',
          openMode: 'tab'
        },
        component: () => import(/* webpackChunkName: "menu" */'../views/modules/menu/menu.vue')
      }
    ]
  }, {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/pages/login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior: () => ({
    x: 0,
    y: 0
  })
})

router.beforeEach((to, from, next) => {
  if (cookies.get('token')) {
    if (store.state.addRouterIsComplete) return next()
    store.dispatch('getMenuData').then(data => {
      store.state.addRouterIsComplete = true
      addRouter(data)
      next({
        ...to,
        replace: true
      })
    }).catch(() => {
      cookies.remove('token')
      next({ name: 'login' })
    })
  } else if (to.name === 'login') {
    next()
  } else {
    next({ name: 'login' })
  }
})

export default router

// 设置动态路由
function addRouter(menus) {
  let routers = []
  menus.forEach(menu => {
    recursionPushRoute(menu, routers)
  })
  router.addRoutes([
    {
      path: '/',
      name: 'main-dynamic-route',
      component: () => import(/* webpackChunkName: "main" */ '../views/main/main.vue'),
      redirect: { name: 'sys_home' },
      children: routers
    }, {
      path: '*',
      component: () => import(/* webpackChunkName: "page404" */ '../views/pages/404.vue')
    }
  ])
}

// 组装路由数据
function recursionPushRoute(menu, routers) {
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
