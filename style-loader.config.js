var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

function generateCssLoaders(loaders, options) {
  const cssLoaders = loaders.map(function (item) {
    return {
      loader: `${item}-loader`,
      options: {
        sourceMap: options.sourceMap
      }
    }
  });

  if (options.isDev === 'development') {
    return cssLoaders;
  } else {
    return ExtractTextWebpackPlugin.extract({
      fallback: 'vue-style-loader',
      use: cssLoaders
    });
  }
}

module.exports = generateCssLoaders;