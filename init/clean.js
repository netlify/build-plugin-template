const { readFile, writeFile } = require('fs')
const { promisify } = require('util')

const del = require('del')
const omit = require('omit.js')

const PACKAGE_ROOT = `${__dirname}/..`
const SCRIPTS_DIR = `${PACKAGE_ROOT}/init`
const PACKAGE_JSON = `${PACKAGE_ROOT}/package.json`
const ESLINTRC = `${PACKAGE_ROOT}/.eslintrc.yml`

const pReadFile = promisify(readFile)
const pWriteFile = promisify(writeFile)

// Remove all files, properties and logic needed by `npm run init` once
// `npm run init` is done.
const cleanRepo = async function() {
  await Promise.all([
    del(SCRIPTS_DIR, { force: true }),
    cleanPackageJson(),
    cleanEslintrc(),
  ])
}

// Remove `npm run init` in `package.json` and all `devDependencies`.
const cleanPackageJson = async function() {
  const content = await pReadFile(PACKAGE_JSON, 'utf8')
  const { scripts, ...packageJson } = JSON.parse(content)

  const scriptsA = omit(scripts, 'init')
  const packageJsonA = omit(packageJson, 'devDependencies')
  const packageJsonB = { ...packageJsonA, scripts: scriptsA }

  const contentA = JSON.stringify(packageJsonB, null, 2)
  await pWriteFile(PACKAGE_JSON, contentA)
}

// Remove init-specific ESLint rules
const cleanEslintrc = async function() {
  const content = await pReadFile(ESLINTRC, 'utf8')
  const contentA = content.replace(ESLINTRC_REGEXP, '')
  await pWriteFile(ESLINTRC, contentA)
}

const ESLINTRC_REGEXP = /overrides:[^]*/

module.exports = { cleanRepo }
