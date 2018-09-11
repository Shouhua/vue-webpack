var ora = require('ora');
var rm = require('rimraf');
var webpack = require('webpack');
var procConfig = require('./webpack.proc.config.js');
var chalk = require('chalk');
var path = require('path');

const env = process.env.NODE_ENV || 'development';
console.log(chalk.yellow(`env: ${env}`));

const spinner = ora(`building in ${env}...\n`);
spinner.start();

rm(path.resolve(__dirname, 'dist'), err => {
  if (err) throw err;

  webpack(procConfig, (err, stats) => {
    if (err) throw err;

    spinner.stop();

    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  });
});