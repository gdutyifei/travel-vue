require('./check-versions')()
require('shelljs/global') // 使用了 shelljs 插件，可以让我们在 node 环境的 js 中使用 shell

process.env.NODE_ENV = 'production'

var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')
var glob = require('glob');

var spinner = ora('building for production...')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }
    /* 拼接编译输出文件路径 */
    var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
    /* 复制 static 文件夹到我们的编译输出目录 */
    // cp('-R', assetsPath, assetsPath2)
    glob.sync('./src/'+config.moduleName+'/**/**/*.js').forEach(function (entry) {
      var tmp = entry.split('/').splice(-4);

      var pathsrc = tmp[0]+'/'+tmp[1];``
      if(tmp[0] == 'src') {
        pathsrc = tmp[1];
        pathsrc = path.join(config.build.assetsRoot, pathsrc)
        cp('-R', assetsPath, pathsrc)
      } else if(tmp[0] == 'view') {
        pathsrc = path.join(config.build.assetsRoot, pathsrc)
        // cp('-R', assetsPath, pathsrc)
      }
      //console.log(pathsrc)
      //console.log(pathname+'-----------'+entry);

    });
    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
