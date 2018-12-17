var chalk = require('chalk');
var Webpack = require('webpack');
var WebPackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.dev.config.js');
var dllConfig = require('./webpack.dll.config');
var path = require('path');
var ora = require('ora');
var rm = require('rimraf');

// start build dll
var spinner = ora(`build begin in ${process.env.NODE_ENV} environment...`);
spinner.start();

// rm(path.resolve(__dirname, 'dist'), (err) => {
// if (err) throw err;
// var dllCompiler = Webpack(dllConfig, (err, stats) => {
//   if (err || stats.hasErrors()) {
//     console.log(chalk.red(` build DLL error...`));
//   }
// });
// dllCompiler.run((err, stats) => {
//   if (err || stats.hasErrors()) {
//     console.log(chalk.red(` build DLL error...`));
//   }

webpackConfig.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/", "webpack/hot/dev-server");
var compiler = Webpack(webpackConfig);

var devServerOptions = Object.assign({}, webpackConfig.devServer, {
  stats: {
    // colors: true,
    // errors: true,
    // modules: true,
    // assets: true,
    chunks: true,
    
  },
  contentBase: path.resolve(__dirname, 'dist'),
  hot: true,
  publicPath: '/'
});

var server = new WebPackDevServer(compiler, devServerOptions);
server.listen(8080, 'localhost', (err) => {
  spinner.stop();
  if (err) {
    console.log(chalk.red(`error: ${err}`))
  }
  console.log(chalk.yellow('Starting server on http://localhost:8080'));
});
// });
// });