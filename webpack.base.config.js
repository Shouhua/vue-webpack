var path = require('path');
var VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    // hash是整个编译环境的hash值，可以作为文件夹的名字发布版本包
    // chunkhash是文件内容的hash值
    // css作为js文件一部分，尽管抽取出来，但是如果使用chunkhash会有一样的chunkhash，使用contenthash
    // filename在使用web-dev-server的时候不能使用chunkhash
    filename: '[name].[chunkhash:8].js',
    library: '[name]',
    chunkFilename: '[name].[chunkhash:8].js'
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['.js', '.vue']
  },
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
  },
  plugins: [
    new VueLoaderPlugin(),
    // new webpack.DefinePlugin({})
  ]
}