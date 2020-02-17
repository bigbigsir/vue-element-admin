<template>
  <el-dropdown @command="handleLangSelect" trigger="click" size="medium" placement="bottom">
    <span class="trigger">
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
   * Created by bigBigSir on 2019/4/3
   */
import { messages } from '../language/index'

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
      this.$message({
        type: 'success',
        message: this.$t('prompt.success'),
        duration: 1000
      })
      localStorage.setItem('language', lang)
    }
  }
}
</script>
