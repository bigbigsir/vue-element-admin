# vue-element-admin
## 项目简介
>本项目是一个后台管理平台基础模板，技术栈基于 ES2015+、vue、vuex、vue-router 、vue-cli 、axios 和 element-ui
>主要实现功能i18国际化、动态路由、token权限、换肤、element组件大小动态切换等
>本项目的定位是管理平台基础模板、业务层面只涉及菜单及用户的管理，简单易上手
>项目后台采用的nodejs，[飞机票](https://github.com/bigbigsir/nodeJs)
> [预览地址](http://60kg.top/dist)  登录：admin1 admin1

- 生成ElementUi主题变量文件 element-variables.scss
```et -i```
- 生成ElementUi默认主题（根据element-variables.scss生成）
```gulp createDefaultTheme```
- 依据主题配置文件生成主题
```gulp createThemes```

>也可以直接运行package.json文件中的命令

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
