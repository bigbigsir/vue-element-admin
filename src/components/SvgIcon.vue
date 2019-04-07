<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
  /**
   * Created by XiaoJie on 2019/3/28
   */
  export default {
    name: 'SvgIcon',
    props: {
      icon: {
        type: String,
        required: true,
        default: ''
      },
      className: {
        type: String,
        default: ''
      }
    },
    computed: {
      iconName () {
        return `#icon-${this.icon.replace(/^icon-/g, '')}`
      },
      svgClass () {
        if (this.className) {
          return 'svg-icon ' + this.className
        } else {
          return 'svg-icon'
        }
      }
    }
  }
</script>
