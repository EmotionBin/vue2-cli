const path = require('path');

const pathResolve = pathName => path.resolve(__dirname, pathName);

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  publicPath: '/',
  // 保存的时候自动根据 eslint 规则校验
  lintOnSave: !isProduction,
  chainWebpack: config => {
    const scssMap = config.module.rule('scss').oneOfs.store;
    scssMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          // 手动注入 sass 的 variables 与 mixin
          resources: [
            pathResolve('src/styles/common/variables.scss'),
            pathResolve('src/styles/common/mixin.scss'),
          ],
        })
        .end();
    });
  },
  configureWebpack: config => {
    config.devtool = isProduction ? false : 'source-map';
  },
  devServer: {
    https: false,
    port: 9527,
    open: false,
  },
};
