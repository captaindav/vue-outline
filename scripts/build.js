const spawn = require('cross-spawn')

let target = process.argv[2]
const alias = {}
target = alias[target] || target

if (!target) {
  spawn('yarn', ['lerna', 'run', 'build', '--stream'], { stdio: 'inherit' })
} else {
  spawn('yarn', ['lerna', 'run', 'build', '--scope', target, '--stream'], { stdio: 'inherit' })
}
