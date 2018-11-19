#!/usr/bin/env node

const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const spawn = require('cross-spawn')
const exec = require('child_process').exec
const pathExists = require('path-exists')
const rimraf = require('rimraf')
const log = console.log;

const copyRecursiveSync = (src, dest) => {
  log(chalk.dim(`${src}->${dest}`));
  const stats = fs.statSync(src)
  const isDirectory = stats.isDirectory()

  if (isDirectory) {
    fs.mkdirSync(dest)
    fs.readdirSync(src).forEach(childDir => {
      copyRecursiveSync(path.join(src, childDir), path.join(dest, childDir));
    })
  } else {
    fs.createReadStream(src).pipe(fs.createWriteStream(dest))
  }
}
const start = () => {
  const option = process.argv.slice(2)
  const baseDir = process.cwd()
  const projectName = option[0]
  
  const dist = path.join(baseDir, projectName)
  copyRecursiveSync(path.join(__dirname, 'template'), dist)
  log(chalk.bold.cyan('\n Project directory creation completed! \n'))
  process.on('uncaughtException', (err) => {
    return log(chalk.bold.bgRed(`Error: ${err}`))
  });
  log(chalk.bold.white('\n yarn add packages... this may take some time. \n'))

  spawn('yarn', {
    stdio: 'inherit',
    cwd: dist,
    detached: true
  })
  exec('yarn', { cwd: dist }, err => {
    if (err) {
      log(chalk.bold.bgRed(err))
      return;
    }
    log(chalk.bold.cyan('\n all done!\n\n'))
  })
}

const run = () => {
  const option = process.argv.slice(2)
  const projectName = option[0]

  if (!projectName)
    return log(chalk.bold.bgRed('Error: no project name provided, try again `prayer-cli projectName` instead.'))

  if (pathExists.sync(projectName))
    return log(chalk.bold.bgRed(`Error: folder ${projectName} exist.`))

  if (process.version.slice(1).split('.')[0] < 6)
    return log(chalk.bold.bgRed('Error: Node version should be more than v6.x.'))

  return new Promise(resolve => {
    rimraf(path.join(__dirname, 'template'), () => {
      const cmd = 'git clone https://github.com/yqcscaff/prayer-pro.git template'
      exec(cmd, { cwd: path.resolve(__dirname) }, err => {
        if (err) {
          log(chalk.bold.bgRed(err))
          return;
        }
        resolve();
      });
    })
  }).then(start);
}

run()