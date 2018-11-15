
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const config = require('../config');
const baseWebpackConfig = require('./webpack.base.conf');

module.exports = merge(baseWebpackConfig, {
  mode: config.dev.env.NODE_ENV,
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
        }
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(config.dev.env.NODE_ENV)
      }
    }),
    new HtmlwebpackPlugin({
      title: 'Webpack-demos',
      filename: 'index.html',
      template: './index.html',
      inject: true,
      minify: {
        collapseWhitespace: false,
        removeComments: false,
        removeRedundantAttributes: false
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsWebpackPlugin()
  ]
})