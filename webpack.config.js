var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var VueLoaderPlugin = require('vue-loader/lib/plugin');
var fs = require('fs');
var chalk = require('chalk');
var camelCase = require('camelcase');
var webpack = require('webpack');
var UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin');
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
var DllReferencePlugin = require('webpack/lib/DllReferencePlugin');
var manifest = require('./dist/dll/vendor.manifest.json');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const env = process.env.NODE_ENV;

module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: '[name]',
    chunkFilename: '[name].[chunkhash:5].js'
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['.js', '.vue']
  },
  devtool: env === 'development' ? '//@source-map' : false, // 设置source map, 前缀只是用于注释的前缀
  module: {
    rules: [{
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
}

let plugins = [
  new VueLoaderPlugin(),
  new webpack.DefinePlugin({}),
];
let entry = {};

if (env === 'development') {
  // 设置entry
  entry['main'] = `./src/main.js`;

  // 添加webpack-dev-server
  module.exports.devServer = {
    contentBase: './dist',
    hot: true
  };

  // 设置开发环境的plugin
  plugins = plugins.concat([
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.dev.html')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new DllReferencePlugin({
      manifest
    }),
    new webpack.NamedModulesPlugin(), // 热替换时使用包名称
    new BundleAnalyzerPlugin(
      {
        analyzerMode: 'server',
        analyzerHost: '127.0.0.1',
        analyzerPort: 8889,
        reportFilename: 'report.html',
        defaultSizes: 'parsed',
        openAnalyzer: true,
        generateStatsFile: false,
        statsFilename: 'stats.json',
        statsOptions: null,
        logLevel: 'info'
      })
  ]);
} else {
  const moduleNames = fs.readdirSync(path.resolve(__dirname, 'src/modules'));
  if (moduleNames && Array.isArray(moduleNames)) {
    moduleNames.forEach((moduleName) => {
      entry[`${camelCase(moduleName)}AsyncModule`] = path.resolve(__dirname, `src/modules/${moduleName}/export.js`);
    });
  }
  plugins = plugins.concat([
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
      filename: 'css/[name].[contenthash:5].css'
    })
  ]);
}

function generateCssLoaders(loaders, options) {
  const cssLoaders = loaders.map(function (item) {
    return {
      loader: `${item}-loader`,
      options: {
        sourceMap: options.sourceMap
      }
    }
  });

  if (env === 'development') {
    return cssLoaders;
  } else {
    return ExtractTextWebpackPlugin.extract({
      fallback: 'vue-style-loader',
      use: cssLoaders
    });
  }
}

module.exports.entry = entry;
module.exports.plugins = plugins;
module.exports.module.rules.push({
  test: /\.scss$/,
  exclude: /node_modules/,
  use: generateCssLoaders(
    ['vue-style', 'css', 'sass', 'postcss'], {
      sourceMap: env === 'developement' ? true : false
    }
  )
});

console.log(chalk.yellow(`Running at: ${new Date(Date.now()).toLocaleString()}`));

console.log(chalk.yellow(`current environment: ${process.env.NODE_ENV}`));

for (let key in module.exports.entry) {
  console.log(chalk.yellow(`${key}: `), chalk.blue(`${module.exports.entry[key]}`));
}