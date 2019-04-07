<template>
  <aside :class="{'dark':sideMenuDarkSkin}" class="main-side-menu fl">
    <el-scrollbar>
      <el-menu
        @select="selectMenuHandle"
        :collapse="isCollapse"
        :collapse-transition="false"
        class="side-menu-root"
        :default-active="menuActiveIndex">
        <SubMenu v-for="menu in menuData" :key="menu.id" :menu="menu"></SubMenu>
      </el-menu>
    </el-scrollbar>
  </aside>
</template>

<script>
  /**
   * Created by XiaoJie on 2019/3/28
   */
  import SubMenu from './subMenu.vue'
  import { mapState } from 'vuex'

  export default {
    name: 'mainSideMenu',
    components: { SubMenu },
    data () {
      return {}
    },
    created () {
    },
    computed: {
      ...mapState(['menuData', 'menuActiveIndex', 'menuKey', 'isCollapse', 'sideMenuDarkSkin'])
    },
    methods: {
      // 点击菜单项时触发
      selectMenuHandle (menuId) {
        let menu = this.findMenuItem(this.menuData, menuId)
        if (menu) this.$router.push(menu.routerPath)
      },
      // 依据菜单ID在菜单数据中查找该项菜单
      findMenuItem (menus, menuId) {
        let menu = null
        for (let i = menus.length; i--;) {
          if (menus[i].id === menuId) {
            menu = menus[i]
            break
          }
          if (menus[i].children && menus[i].children.length) {
            menu = this.findMenuItem(menus[i].children, menuId)
          }
        }
        return menu
      }
    }
  }
</script>
