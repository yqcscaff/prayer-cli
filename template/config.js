
'use strict';
const path = require('path');

module.exports = {
  prod: {
    env: {
      NODE_ENV: 'production'
    },
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true
  },
  dev: {
    env: {
      NODE_ENV: 'development'
    },
    port: process.env.PORT || 8000,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/j/search_subjects': {
        target: 'https://movie.douban.com/',
        changeOrigin: true,
        pathRewrite: {
          '^/j/search_subjects': '/j/search_subjects'
        }
      }
    },
    cssSourceMap: false
  }
};
