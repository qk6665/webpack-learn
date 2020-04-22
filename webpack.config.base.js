const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')  //

const webpackConfig = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    //publicPath: '/assert/',
  },
  //resolve            改变模块解析路径名称



  plugins: [
    new CleanWebpackPlugin(),         //打包时自动清除打包目录
    new HtmlWebpackPlugin({
      template: './assert/index.html',
      filename: 'index.html',
      //hash: true,   //为每次打包生成hash段。将output.filename改名为bundle.[hash:8].js可以保存每次打包的版本
    }),
    new CopyWebpackPlugin([          //打包时复制文件或目录
      { from: path.resolve(__dirname, 'assert/img/htmlImg'), to: path.resolve(__dirname, 'build/img/htmlImg') }
    ]),
    new webpack.DefinePlugin({           //环境变量
      'process.env': {
        NODE_ENV: (process.env.NODE_ENV === 'production' ||
          process.env.NODE_ENV === 'prod') ? "'production'" :
          "'development'"
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',          //详细配置在.babelrc文件中
        exclude: [path.join(__dirname, '/node_modules')],   //排除node_modules目录的文件
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
  }
}

module.exports = webpackConfig
