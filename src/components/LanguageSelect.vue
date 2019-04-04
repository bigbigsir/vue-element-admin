<template>
  <el-dropdown @command="handleLangSelect" trigger="click" size="medium" placement="bottom">
    <span class="el-dropdown-link">
      <slot></slot>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-for="(val, key) in messages" :disabled="key===$i18n.locale" :key="key" :command="key">
        {{ val._lang }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
  /**
   * Created by XiaoJie on 2019/4/3
   */
  import { messages } from '@/lang'

  export default {
    name: 'LanguageSelect',
    data () {
      return {
        messages
      }
    },
    methods: {
      // 语言选择
      handleLangSelect (lang) {
        this.$i18n.locale = lang
        localStorage.setItem('language', lang)
      }
    }
  }
</script>
