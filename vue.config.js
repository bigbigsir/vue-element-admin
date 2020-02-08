/**
 * Created by emoji on 2019/3/9
 */
'use strict'

const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  outputDir: 'admin',
  publicPath: '/admin', // 打包时相对路径
  lintOnSave: false, // 保存是执行eslint
  devServer: { // 配置服务
    port: 8081, // 端口号
    open: true // 配置是否自动启动浏览器
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
  },
  configureWebpack: config => {
    if (isProduction) {
      // config.plugins.push(new CompressionWebpackPlugin({
      //   algorithm: 'gzip',
      //   test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
      //   threshold: 10240,
      //   minRatio: 0.8
      // }))
      config.plugins.push(new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            warnings: false,
            drop_debugger: true,
            drop_console: true
          }
        },
        sourceMap: false,
        parallel: true
      }))
    }
  }
}
