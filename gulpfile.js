/**
 * Created by bigBigSir on 2019/3/30
 * gulp打包配置文件
 * 根据主题颜色配置文件（theme_config/config.js）生成不同颜色的element-theme
 * 并将依赖于element-variables.scss样式变量的项目其他样式文件，根据不同主题生成不同样式文件，以便不同主题下的颜色统一
 */
'use strict'

require('colors')
const fs = require('fs')
const del = require('del')
const et = require('element-theme')

const gulp = require('gulp')
const gUtil = require('gulp-util')
const plumber = require('gulp-plumber') // 检测错误
const sass = require('gulp-sass') // 编译scss
const cleanCss = require('gulp-clean-css') // 压缩css
const autoPrefixer = require('gulp-autoprefixer') // 自动添加css前缀
// 使用module.exports，vue打包后会报错，为了满足页面使用，这里只有使用字符串
let themeConfig = fs.readFileSync('./src/theme_config/config.js', 'utf8')
let index = themeConfig.indexOf('[')
let lastIndex = themeConfig.lastIndexOf(']')
let str = themeConfig.substring(index, lastIndex + 1)
let themeList = eval(str).filter(item => !item.hasBuild) // 主题配置列表

let nowTheme = null // 当前构建中的主题名字
let etConfig = require('./package.json')['element-theme'] // element-theme配置信息
let variablesScss = etConfig.config.replace(/.*\/(.+\.scss)/, '$1') // 变量样式文件名
let styleFileDir = './src/assets/css/follow_theme' // 需要跟随主题切换颜色的样式文件存放目录
let styleFileNames = fs.readdirSync(styleFileDir) // 样式目录下所有文件名
let styleFileTempDir = `${styleFileDir}_temp` // 打包时自动创建的临时目录地址
let themeFileOutDir = './public/element-theme' // 主题文件打包输出目录

// 依据element-theme配置生成element-ui样式文件
gulp.task('createDefaultTheme', () => {
  return new Promise((resolve) => {
    et.run(etConfig, () => {
      // 删除主题独立组件样式文件
      let files = [
        `${etConfig.out}/**/*.css`,
        `!${etConfig.out}/**/index.css`,
        `!${etConfig.out}/**/fonts`
      ]
      del(files)
      console.log('\n', '<======================== 构建完毕，删除独立组件样式文件 ========================>'.green.bold, '\n')
      console.log(files)
      resolve()
    })
  })
})

// gulp构建生成主题任务
gulp.task('createThemes', () => {
  // 删除临时目录，保证本次操作正常执行（确保创建目录时不会出错）
  del.sync(styleFileTempDir)
  // 创建临时目录，作为构建的临时处理文件夹
  fs.mkdirSync(styleFileTempDir)
  // 拷贝element-ui的element-variables.scss变量样式文件至临时处理文件夹中
  copyIt(etConfig.config, `${styleFileTempDir}/${variablesScss}`)
  // 拷贝项目中依赖element-variables.scss的样式文件至临时处理文件夹中
  styleFileNames.forEach(fileName => {
    copyIt(`${styleFileDir}/${fileName}`, `${styleFileTempDir}/${fileName}`)
  })
  // 修改element-theme配置中变量文件的入口地址
  etConfig.config = `${styleFileTempDir}/${variablesScss}`
  // 开始构建生成主题配置中的主题
  return new Promise((resolve) => {
    createTheme(themeList, resolve)
  })
})

// 构建生成element-theme
function createTheme (themeList, resolve) {
  let data
  let result
  if (themeList.length) {
    // 保存当前正在构建的主题对象
    nowTheme = themeList[0]
    console.log('\n', '<========================         待构建主题          ========================>'.red, '\n')
    console.log(themeList)
    console.log('\n', '<========================         构建中主题          ========================>'.green, '\n')
    console.log(nowTheme)

    // 修改element-variables.scss临时文件中的$--color-primary主题变量值
    data = fs.readFileSync(etConfig.config, 'utf8')
    result = data.replace(/\$--color-primary:(.*) !default;/, `$--color-primary:${nowTheme.color} !default;`)
    fs.writeFileSync(etConfig.config, result)

    // 样式文件引入element-variables.scss的引用路径
    styleFileNames.forEach(fileName => {
      data = fs.readFileSync(`${styleFileTempDir}/${fileName}`, 'utf8')
      result = data.replace(new RegExp(`(@import ")(.*/)(${variablesScss}";)`), '$1./$3')
      fs.writeFileSync(`${styleFileTempDir}/${fileName}`, result)
    })

    // 修改element-theme配置中主题输出目录（以主题的颜色name作为区分文件夹）
    etConfig.out = `${themeFileOutDir}/${nowTheme.name}`
    // 调用element-theme插件，生成element-ui主题
    et.run(etConfig, () => {
      removeFontFace(etConfig.out)
      compileScss(styleFileTempDir, () => {
        themeList.splice(0, 1)
        createTheme(themeList, resolve)
      })
    })
  } else {
    // 删除主题独立组件样式文件和fonts文件
    let files = [
      `${themeFileOutDir}/**/*.css`,
      `${themeFileOutDir}/**/fonts`,
      `!${themeFileOutDir}/**/index.css`
    ].concat(styleFileNames.map(fileName => {
      return `!${themeFileOutDir}/**/${fileName.split('.')[0]}.css`
    }))
    console.log('\n', '<========================     构建完毕，删除临时目录    ========================>'.green.bold, '\n')
    del(styleFileTempDir)
    console.log(styleFileTempDir)
    console.log('\n', '<======================== 构建完毕，删除独立组件样式文件 ========================>'.green.bold, '\n')
    del(files)
    console.log(files)
    resolve()
  }
}

// 将指定目录中的sass文件编译成css后自动添加前缀再压缩css
function compileScss (dir, cb) {
  gulp.src(`${dir}/*.scss`)
    .pipe(plumber(errorHandler))
    .pipe(sass())
    .pipe(autoPrefixer({
      browsers: etConfig.browsers,
      cascade: false
    }))
    .pipe(cleanCss({ compatibility: 'ie9' }))
    // .pipe(rename('aui.css'))
    .pipe(gulp.dest(etConfig.out))
    .on('end', cb)

  // 编译错误处理函数，控制台发声,错误时beep一下
  function errorHandler (e) {
    gUtil.beep()
    gUtil.log(e)
    this.emit('end')
  }
}

/**
 * @description 复制文件
 * @param {string} from 需要拷贝的文件路径
 * @param {string} to   拷贝存放的文件路径
 */
function copyIt (from, to) {
  fs.writeFileSync(to, fs.readFileSync(from))
}

// 删除字体图标引入
function removeFontFace (path) {
  fs.readdirSync(path).forEach(file => {
    if (file === 'index.css') {
      let data = fs.readFileSync(`${path}/${file}`, 'utf8')
      let result = data.replace(/@font-face{[^}]+}/, '')
      fs.writeFileSync(`${path}/${file}`, result)
    }
  })
}
