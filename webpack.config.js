const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin')

module.exports = {
  //mode: 'production',
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    //publicPath: '/assert/',
  },
  //resolve            改变模块解析路径名称
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
  // watch: true,       //实时打包，无需进入devServer
  // watchOptions: {
  //   poll: 1000, // 每秒询问多少次
  //   aggregateTimeout: 500,  //防抖 多少毫秒后再次触发
  //   ignored: [path.join(__dirname, '/node_modules')], //忽略文件夹
  // },
  plugins: [
    new CleanWebpackPlugin(),         //打包时自动清除打包目录
    new HtmlWebpackPlugin({
      template: './assert/index.html',
      filename: 'index.html',
      //hash: true,   //为每次打包生成hash段。将output.filename改名为bundle.[hash:8].js可以保存每次打包的版本
    }),
    new CopyWebpackPlugin([          //打包时复制文件或目录
      { from: path.resolve(__dirname, 'assert/img/htmlImg'), to: path.resolve(__dirname, 'build/img/htmlImg') }
    ])
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',          //详细配置在.babelrc文件中
        exclude: [path.join(__dirname, '/node_modules')],   //排除node_modules目录的文件
      },
      {
        test: /\.js$/,
        loader: 'eslint-loader',          //详细配置使用'eslint --init'命令自动生成
        enforce: 'pre',
        exclude: [path.join(__dirname, '/node_modules')],
      },
      {
        //loader顺序默认从右向左，优先级高的应放后面
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',     //style-loader在html中插入css标签
            options: {
              //insert: 'head',     //将css属性插入值head，为默认值
            },
          },
          'css-loader',      //css-loader解析@import这种语法
        ]
      },
      {
        test: /\.less$/,      //sass stylus同理
        use: [
          {
            loader: 'style-loader',     //style-loader在html中插入css标签
            options: {
              insert: 'head',     //将less属性插入值head，为默认值
            },
          },
          'css-loader',      //css-loader解析@import这种语法
          'less-loader',     //less-loader将less转换为css
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',      //以js形式或css形式加载图片
            options: {
              limit: 1,    //单位是字节，小于该体积采用base64储存，大于该体积采用file-loader储存
              outputPath: 'img/'
            },
          },
        ],
      },
    ],
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
            drop_debugger: true,
          },
          output: {
            comments: false,
            beautify: false,
          },
          mangle: true,
        },
        parallel: true,
        sourceMap: false,
      })
    ],
  }
};
