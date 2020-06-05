const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const webpack = require('webpack')
const devMode = process.env.NODE_ENV !== 'production'

const webpackConfig = {
  entry: './src/index.js',
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'build'),
    // publicPath: ''
  },
  resolve: {
    // 改变模块解析路径名称
    extensions: ['.ts', '.tsx', '.js'], // 导入模块时免输入后缀名
  },
  plugins: [
    new BundleAnalyzerPlugin(), // 这个插件会清晰的展示出打包后的各个bundle所依赖的模块
    new CleanWebpackPlugin(), // 打包时自动清除打包目录
    new MiniCssExtractPlugin({
      // css抽离为单独部分
      filename: 'css/index.css',
    }),
    new HtmlWebpackPlugin({
      template: './assert/index.html',
      filename: 'index.html',
      // hash: true,   //为每次打包生成hash段。将output.filename改名为bundle.[hash:8].js可以保存每次打包的版本
    }),
    new CopyWebpackPlugin([
      // 打包时复制文件或目录
      {
        from: path.resolve(__dirname, 'assert/img/htmlImg'),
        to: path.resolve(__dirname, 'build/img/htmlImg'),
      },
    ]),
    new webpack.DefinePlugin({
      // 环境变量
      'process.env': {
        NODE_ENV:
          process.env.NODE_ENV === 'production' ||
          process.env.NODE_ENV === 'prod'
            ? "'production'"
            : "'development'",
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/, // ts文件转译为js
        loader: 'ts-loader',
        exclude: [path.join(__dirname, '/node_modules')], // 排除node_modules目录的文件
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader', // 详细配置在.babelrc文件中
        exclude: [path.join(__dirname, '/node_modules')],
      },
      {
        test: /\.(sa|sc|c)ss$/, // 可以打包后缀为sass/scss/css的文件
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
              hmr: devMode, // 仅dev环境启用HMR功能,该功能在dev开启热更新的条件下起作用
            },
          },
          'css-loader', // css-loader解析@import这种语法
          'sass-loader', // sass-loader将sass转换为css
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader', // 以js形式或css形式加载图片
            options: {
              limit: 1, // 单位是字节，小于该体积采用base64储存，大于该体积采用file-loader储存
              outputPath: 'img/',
            },
          },
        ],
      },
    ],
  },
  optimization: {},
}

module.exports = webpackConfig
