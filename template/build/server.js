'use strict'

const config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = config.dev.env.NODE_ENV;
}

const opn = require('opn')
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const proxyMiddleware = require('http-proxy-middleware')
const webpackConfig = require('./webpack.dev.conf')

const port = process.env.PORT || config.dev.port
const proxyTable = config.dev.proxyTable

const app = express()
const compiler = webpack(webpackConfig)

// 代理  proxyMiddle
Object.keys(proxyTable).forEach(function (context) {
  const options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// 处理H5 反馈
app.use(require('connect-history-api-fallback')())

// 静态资源目录
const staticPath = path.posix.join('/', 'static')
app.use(staticPath, express.static('./public'))

app.get('/', function(res) {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    chunks: false,
    modules: false,
    colors: true,
    hash: true,
    assets: true,
  }
}));

// 热模块更新 hotMiddle
app.use(require('webpack-hot-middleware')(compiler, {
  info: false
}))

// 启动
const uri = 'http://localhost:' + port
console.log('> Listening at ' + uri + '\n')
app.listen(port);
opn(uri);