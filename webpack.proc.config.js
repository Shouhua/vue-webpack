var baseConfig = require('./webpack.base.config');
var camelCase = require('camelcase');
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
var fs = require('fs');
var generateCssLoaders = require('./style-loader.config');
var merge = require('webpack-merge');
var path = require('path');
var UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin');

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
    new UglifyJsWebpackPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      parallel: true
    }),
    new ExtractTextWebpackPlugin({
      allChunks: true,
      filename: 'css/[name].css'
    })
  ]
};

const moduleNames = fs.readdirSync(path.resolve(__dirname, 'src/modules'));
if (moduleNames && Array.isArray(moduleNames)) {
  moduleNames.forEach((moduleName) => {
    config.entry[`${camelCase(moduleName)}AsyncModule`] = path.resolve(__dirname, `src/modules/${moduleName}/export.js`);
  });
}

module.exports = merge(baseConfig, config);