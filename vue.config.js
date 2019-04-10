/**
 * Created by emoji on 2019/3/9
 */
'use strict'

const path = require('path')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/', // 打包时相对路径
  lintOnSave: false, // 关闭eslint
  productionSourceMap: true, // 生产环境下css 分离文件
  devServer: { // 配置服务
    port: 8080, // 端口号
    open: true, // 配置是否自动启动浏览器
    https: false,
    overlay: {
      warnings: true,
      errors: true
    }
    // proxy: { // 配置代理
    //   '': {
    //     target: 'http://127.0.0.1:3000',
    //     // pathRewrite: { '/node': '' },
    //     ws: false, // 代理 websockets
    //     changeOrigin: true
    //   }
    // }
  },
  configureWebpack: { // 配置目录别名
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src')
        // 'assets': path.join(__dirname, '/src/assets')
        // 'components': path.resolve(__dirname, '/src/components'),
        // 'api': path.resolve(__dirname, '/src/api'),
        // 'utils': path.resolve(__dirname, '/src/utils'),
        // 'store': path.resolve(__dirname, '/src/store'),
        // 'router': path.resolve(__dirname, '/src/router')
      }
    }
  },
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear()
    svgRule
      .test(/\.svg$/)
      .include.add(path.resolve(__dirname, './src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
    const fileRule = config.module.rule('file')
    fileRule.uses.clear()
    fileRule
      .test(/\.svg$/)
      .exclude.add(path.resolve(__dirname, './src/icons'))
      .end()
      .use('file-loader')
      .loader('file-loader')
  }
}
