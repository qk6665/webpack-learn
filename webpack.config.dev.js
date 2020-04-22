const path = require('path')
const webpackMerge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.config.base')

const webpackConfig = webpackMerge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'source-map',   //增加映射文件，帮助调试代码
  devServer: {
    port: 8080,
    progress: true,   //显示打包进度条
    contentBase: path.resolve(__dirname, 'build'),   //入口html目录，绝对路径
    compress: true,    //压缩传输，减小页面体积，加快加载速度
    //publicPath: '/assert/',  //此路径下的打包文件可在浏览器中访问。一般情况下都要保证devServer.publicPath与output.publicPath保持一致。
    proxy: {
      "/": "http://localhost:3000",   //服务器代理
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',          //详细配置使用'eslint --init'命令自动生成
        enforce: 'pre',
        exclude: [path.join(__dirname, '/node_modules')],
      },
    ]
  }
})

module.exports = webpackConfig
