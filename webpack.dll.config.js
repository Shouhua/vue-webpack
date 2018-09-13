var DllPlugin = require('webpack/lib/DllPlugin');
var path = require('path');

module.exports = {
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
    },
    extensions: ['.js', '.vue']
  },
  entry: {
    vendor: ['vue', 'vue-router', 'element-ui']
  },
  output: {
    filename: '[name].dll.js',
    path: path.resolve(__dirname, 'dist/dll'),
    library: '_dll_[name]'
  },
  plugins: [
    new DllPlugin({
      name: '_dll_[name]',
      path: path.resolve(__dirname, 'dist/dll/[name].manifest.json')
    })
  ]
};