var baseConfig = require('./webpack.base.config');
var camelCase = require('camelcase');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var fs = require('fs');
var generateCssLoaders = require('./style-loader.config');
var merge = require('webpack-merge');
var path = require('path');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var AssetsPlugin = require('assets-webpack-plugin'); // 生成包对应路径的json文件
// var MD5HashPlugin = require('webpack-md5-hash');

const config = {
  entry: {},
  devtool: false,
  module: {
    rules: [{
      test: /\.scss$/,
      exclude: /node_modules/,
      use: generateCssLoaders(
        ['vue-style', 'css', 'sass', 'postcss'], {
          sourceMap: false,
          isDev: false
        })
    }]
  },
  plugins: [
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      parallel: true
    }),
    new ExtractTextPlugin({
      allChunks: true,
      filename: 'css/[name].[contenthash:8].css'
    }),
    new AssetsPlugin({
      path: path.resolve(__dirname, 'dist')
    }),
    // new MD5HashPlugin()
  ]
};

const moduleNames = fs.readdirSync(path.resolve(__dirname, 'src/modules'));
if (moduleNames && Array.isArray(moduleNames)) {
  moduleNames.forEach((moduleName) => {
    config.entry[`${camelCase(moduleName)}AsyncModule`] = path.resolve(__dirname, `src/modules/${moduleName}/export.js`);
  });
}

module.exports = merge(baseConfig, config);