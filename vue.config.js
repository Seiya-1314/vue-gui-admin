const path = require('path');

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/vue-gui-admin/' : '/',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  pluginOptions: {
    /* 自动化导入 scss ：https://www.npmjs.com/package/vue-cli-plugin-style-resources-loader */
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/styles/_variables.scss'),
        path.resolve(__dirname, 'src/styles/_mixins.scss')
      ]
    }
  },
  configureWebpack: {
    devtool: process.env.NODE_ENV === 'development' ? 'cheap-source-map' : false
  }
};
