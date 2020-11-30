const spawn = require('cross-spawn')

let target = process.argv[2]
const alias = {}
target = alias[target] || target

if (!target) {
  spawn('yarn', ['lerna', 'run', 'serve', '--stream'], { stdio: 'inherit' })
} else {
  spawn('yarn', ['lerna', 'run', 'serve', '--scope', target, '--stream'], { stdio: 'inherit' })
}
