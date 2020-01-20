const execa = require('execa')

const { getOptions } = require('./options.js')
const { applyTemplates } = require('./template.js')
const { runTests } = require('./test.js')
const { cleanRepo } = require('./clean.js')

// `npm run init` main logic.
// Initialize/scaffold the template repository.
const init = async function(options) {
  const { variables } = await getOptions(options)
  await applyTemplates(variables)
  await cleanRepo()
  await execa.command('npm install --no-progress', { stdio: 'inherit' })
  await runTests()
  await execa.command('git add -A')
  await execa.command('git commit -m Init')
}

module.exports = { init }