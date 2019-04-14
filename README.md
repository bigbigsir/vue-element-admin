# vue-element-admin
## 项目简介
>本项目是一个后台管理平台基础模板，技术栈基于: ES2015+、vue(2.6.10)、vuex、vue-router 、vue-cli(3.6.1)、axios、element-ui(2.7.2)、scss、i18n
>主要实现功能i18国际化、动态路由、token权限、主题生成、换肤、element组件大小动态切换等
>本项目的定位是管理平台基础模板、业务层面只涉及菜单及用户的管理，简单易上手，项目还有很多不足，欢迎交流
>项目后台采用的node，[飞机票](https://github.com/bigbigsir/nodeJs)
> [项目预览](http://60kg.top/dist)  登录：admin1 admin1
> 部分思路来源于[PanJiaChen](https://github.com/PanJiaChen)大神的经典[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)

## 目录结构
```
├── public                     # 静态资源
│   │── element-theme          # 主题存放文件夹
│   │── favicon.ico            # favicon图标
│   └── index.html             # html模板
├── src                        # 源代码
│   ├── api                    # axios请求封装
│   ├── assets                 # css、img等静态资源
│   ├── components             # 全局公用组件
│   ├── element-ui             # element-ui样式字体文件
│   ├── icons                  # 项目所有 svg icons
│   ├── language               # 国际化 language
│   ├── mixins                 # 列表数据请求及常用方法的封装
│   ├── router                 # 路由文件
│   ├── store                  # 全局 store管理
│   ├── theme_config           # 主题配置文件
│   ├── util				   # 公用、工具类存放文件夹
│   │   ├──util.js             # 公用方法
│   │   ├──rules.js            # el表单验证常用规则
│   ├── views                  # views 所有页面
│   ├── App.vue                # 入口页面
│   ├── main.js                # 入口文件 加载组件 初始化等
├── tests                      # 测试
├── .eslintrc.js               # eslint 配置项
├── element-variables.scss     # Element 的 theme-chalk 变量文件
├── gulpfile.js                # gulp打包配置文件，用于生成主题
├── vue.config.js              # vue-cli 配置
└── package.json               # package.json
```
## 主题生成说明

> 为什么采用生成好的主题文件，而不是动态换肤，项目可能会局域网部署，需要结合项目的实际情况
> 还可以根据不同主题生成跟随主题色的其他项目样式文件。本项目采用的是gulp生成，具体实现请查看gulpfile.js
[自定义主题官方文档](http://element.eleme.io/#/zh-CN/component/custom-theme)

- 生成ElementUi主题变量文件 element-variables.scss
```
et -i
```

- 生成ElementUi默认主题（根据element-variables.scss主题色生成）
```
gulp createDefaultTheme
```

- 依据主题配置文件生成主题
```
gulp createThemes
```

- 也可以直接运行package.json文件中的命令
![](https://i.imgur.com/Ko4gzmb.png)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
