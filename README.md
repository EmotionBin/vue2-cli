# vue2-ts-cli

一个基于 vue2 与 ts 的脚手架

## todoList
- style 定义 sass 变量并引入使用，参考当前在做的项目
- style 的 mixin 定义并引入使用
- utils 的请求封装，使用 axios 包括类型约束，参考当前在做的项目
- typings 文件夹，包括 interfaces 与 enum 等
- App.vue 文件整理
- vue.config.js整理

## 注意事项

### 保存自动格式化

该脚手架配置了保存自动格式化的功能，以下几个配置必须加上
- 在 `vue.config.js` 文件中加上 `lintOnSave: process.env.NODE_ENV === 'development',`
- 在 vscode 中按下 control + shift + P，选择第一个打开 setting.json 配置文件，加入以下代码:
```javascript
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true
}
```
- 安装插件 editorconfig 
