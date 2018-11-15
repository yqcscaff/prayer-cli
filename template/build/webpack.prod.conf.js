
const merge = require('webpack-merge')
const webpack = require('webpack')
var HtmlwebpackPlugin = require('html-webpack-plugin');
const config = require('../config');
const baseWebpackConfig = require('./webpack.base.conf')

module.exports = merge(baseWebpackConfig, {
  mode: config.prod.env.NODE_ENV,
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(config.prod.env.NODE_ENV)
      }
    }),
    new HtmlwebpackPlugin({
      title: 'Prayer Pro',
      filename: 'dist/index.html',
      template: './index.html',
      inject: true,
      minify: {
        collapseWhitespace: false,
        removeComments: false,
        removeRedundantAttributes: false
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    })
  ]
})