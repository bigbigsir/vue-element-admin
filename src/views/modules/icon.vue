<template>
  <div class="content symbol" v-loading.lock="fullscreenLoading">
    <ul class="icon_lists dib-box">
      <li v-for="item of iconList" :key="item" class="dib">
        <svg-icon class="icon svg-icon" :icon="item"/>
        <div :data-clipboard-text="item.replace(/^icon-/g, '')" class="name cursor-pr">
          {{item.replace(/^icon-/g, '')}}
        </div>
        <div :data-clipboard-text="'#'+item" class="code-name">
          #{{item}}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  /**
   * Created by XiaoJie on 2019/4/3
   */
  import Clipboard from 'clipboard'
  import { getSvgIconList } from '@/util/util'

  export default {
    name: 'sys_icon',
    data () {
      return {
        iconList: [],
        fullscreenLoading: true
      }
    },
    created () {
      console.log('sys_icon')
      this.iconList = getSvgIconList()
    },
    beforeDestroy () {
      this.clipboard.destroy()
    },
    mounted () {
      let $message = null
      this.fullscreenLoading = false
      this.clipboard = new Clipboard('.name').on('success', (e) => {
        $message && $message.close()
        $message = this.$message.success(`${e.text} 文本复制成功`)
        e.clearSelection()
      })
    }
  }
</script>

<style lang="scss" scoped>
  .content {
    height: 100%;
  }

  .icon_lists {
    margin: 0;
    padding: 0;
    width: 100%;
    overflow: hidden;
    *zoom: 1;

    .dib {
      width: 100px;
      margin: 10px;
      text-align: center;
      list-style: none !important;
      cursor: default
    }

    .icon {
      display: block;
      height: 100px;
      line-height: 100px;
      font-size: 42px;
      margin: 10px auto;
      color: #333;
      -webkit-transition: font-size 0.25s linear, width 0.25s linear;
      -moz-transition: font-size 0.25s linear, width 0.25s linear;
      transition: font-size 0.25s linear, width 0.25s linear;

      &:hover {
        font-size: 100px;
      }
    }

    .svg-icon {
      /* 通过设置 font-size 来改变图标大小 */
      width: 1em;
      /* 图标和文字相邻时，垂直对齐 */
      vertical-align: -0.15em;
      /* 通过设置 color 来改变 SVG 的颜色/fill */
      fill: currentColor;
      /* path 和 stroke 溢出 viewBox 部分在 IE 下会显示
          normalize.css 中也包含这行 */
      overflow: hidden;
    }

    .name,
    .code-name {
      line-height: 1.2;
      color: #666;
    }
  }

  .dib-box {
    .dib {
      display: inline-block;
      *display: inline;
      *zoom: 1;
      vertical-align: top;
      font-size: 12px;
      letter-spacing: normal;
      word-spacing: normal;
      line-height: inherit;
    }
  }
</style>
