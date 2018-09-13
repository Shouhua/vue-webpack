var merge = require('webpack-merge');
var baseConfig = require('./webpack.base.config.js');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var DllReferencePlugin = require('webpack/lib/DllReferencePlugin');
var generateCssLoaders = require('./style-loader.config.js');
var webpack = require('webpack');
var manifest = require('./dist/dll/vendor.manifest.json');
var chalk = require('chalk');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var Md5HashPlugin = require('webpack-md5-hash');

console.log(chalk.yellow(`env: ${process.env.NODE_ENV}`));

module.exports = merge(baseConfig, {
  entry: {
    app: [path.resolve(__dirname, 'src/main.js')]
  },
  output: {
    filename: '[name].[hash].js' // web-dev-server中filename不能使用chunkhash
  },
  module: {
    rules: [{
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10,
          name: 'img/[name].[hash:5].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:5].[ext]'
        }
      },
      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules/element-ui/lib')
        ],
        use: generateCssLoaders(
          ['style', 'css'], {
            sourceMap: true,
            isDev: true
          })
      },
      {
        test: /\.scss$/,
        use: generateCssLoaders(
          ['vue-style', 'css', 'sass', 'postcss'], {
            sourceMap: true,
            isDev: true
          })
      }
    ]
  },
  devtool: '//@source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true,
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.dev.html')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new DllReferencePlugin({
      manifest
    }),
    new ExtractTextPlugin({
      allChunks: true,
      filename: 'css/[name].[contenthash:8].css'
    }),
    new webpack.NamedModulesPlugin(), // 热替换时使用包名称
    new Md5HashPlugin()
  ]
});