#!/usr/bin/env node

const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const spawn = require('cross-spawn')
const pathExists = require('path-exists')
const log = console.log;

const copyRecursiveSync = (src, dest) => {
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
const run = () => {
  const option = process.argv.slice(2)
  const baseDir = process.cwd()
  const projectName = option[0]

  if (!projectName)
    return log(chalk.bold.bgRed('Error: no project name provided, try again `prayer-cli projectName` instead.'))

  if (pathExists.sync(projectName))
    return log(chalk.bold.bgRed(`Error: folder ${projectName} exist.`))

  if (process.version.slice(1).split('.')[0] < 6)
    return log(chalk.bold.bgRed('Error: Node version should be more than v6.x.'))
  
  const dist = path.join(baseDir, projectName)

  copyRecursiveSync(path.join(__dirname, 'template'), dist)

  process.on('uncaughtException', (err) => {
    return log(chalk.bold.bgRed(`Error: ${err}`))
  });
  log(chalk.bold.green('project directory build completed!'))
  console.log('yarn add packages...')
  spawn('yarn', {
    stdio: 'inherit',
    cwd: dist,
    detached: true
  })
}
run()