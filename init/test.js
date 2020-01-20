const execa = require('execa')
const { red } = require('chalk')

// Ensure `npm run init` worked by running tests
const runTests = async function() {
  const { all, failed } = await execa.command('ava --verbose', {
    reject: false,
    all: true,
    env: { FORCE_COLOR: '1' },
  })
  if (failed) {
    console.error(all)
    throw new Error(red('Error: Test run failed.'))
  }
}

module.exports = { runTests }
