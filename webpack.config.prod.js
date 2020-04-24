// const path = require('path')
const webpackMerge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.config.base')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const webpackConfig = webpackMerge(baseWebpackConfig, {
  mode: 'production',
  // watch: true,       //实时打包，无需进入devServer
  // watchOptions: {
  //   poll: 1000, // 每秒询问多少次
  //   aggregateTimeout: 500,  //防抖 多少毫秒后再次触发
  //   ignored: [path.join(__dirname, '/node_modules')], //忽略文件夹
  // },
  module: {

  },
  optimization: {
    minimizer: [
      new TerserWebpackPlugin({
        terserOptions: {
          warnings: false,
          compress: {
            warnings: false,
            drop_console: false,
            dead_code: true,
            drop_debugger: true
          },
          output: {
            comments: false,
            beautify: false
          },
          mangle: true
        },
        parallel: true,
        sourceMap: false
      }),
      new OptimizeCSSAssetsPlugin({}) // 压缩css
    ],
    splitChunks: { // 分割代码块
      cacheGroups: { // 缓存组
        commons: { // 公共部分
          name: 'commons',
          chunks: 'initial',
          minChunks: 3, // 最少出现三次
          enforce: true
        }
      }
    }
  }

})

module.exports = webpackConfig
