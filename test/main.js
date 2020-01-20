const test = require('ava')
const execa = require('execa')

const HELPERS_DIR = `${__dirname}/helpers`
const NETLIFY_CONFIG = `${HELPERS_DIR}/netlify.yml`

// Unit tests are using the AVA test runner: https://github.com/avajs/ava
// A local build is performed using the following command:
//   netlify-build --config ./helpers/netlify.yml
// Please see this netlify.yml configuration file. It simply runs the
// Build plugin.
test('Netlify Build should not fail', async t => {
  const childProcess = execa('netlify-build', ['--config', NETLIFY_CONFIG], {
    // `FORCE_COLOR` is needed to show colors in the terminal
    env: { FORCE_COLOR: '1' },
  })
  // Prints output to the terminal
  childProcess.stdout.pipe(process.stdout)
  childProcess.stderr.pipe(process.stderr)
  // Check that build succeeded
  const { exitCode } = await childProcess
  t.is(exitCode, 0)
})
