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

console.log(chalk.yellow(`env: ${process.env.NODE_ENV}`));

module.exports = merge(baseConfig, {
  entry: {
    app: [path.resolve(__dirname, 'src/main.js')]
  },
  module: {
    rules: [{
      test: /\.scss$/,
      exclude: /node_modules/,
      use: generateCssLoaders(
        ['vue-style', 'css', 'sass', 'postcss'], {
          sourceMap: true,
          isDev: true
        })
    }]
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
      filename: 'css/[name].css'
    }),
    new webpack.NamedModulesPlugin(), // 热替换时使用包名称 
  ]
});