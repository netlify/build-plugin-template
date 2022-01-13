import { promises as fs } from 'fs'
import { fileURLToPath } from 'url'

import del from 'del'
import omit from 'omit.js'
import filterObj from 'filter-obj'

const PACKAGE_ROOT = fileURLToPath(new URL('..', import.meta.url))
const SCRIPTS_DIR = `${PACKAGE_ROOT}/init`
const PACKAGE_JSON = `${PACKAGE_ROOT}/package.json`

// Remove all files, properties and logic needed by `npm run init` once
// `npm run init` is done.
export const cleanRepo = async function () {
  await Promise.all([del(SCRIPTS_DIR, { force: true }), cleanPackageJson()])
}

// Remove `npm run init` in `package.json` and all `devDependencies`.
const cleanPackageJson = async function () {
  const content = await fs.readFile(PACKAGE_JSON, 'utf8')
  const { scripts, dependencies, devDependencies, ...packageJson } =
    JSON.parse(content)

  const scriptsA = omit.default(scripts, ['init'])
  const devDependenciesA = filterObj(devDependencies, shouldKeepDevDependency)
  const packageJsonA = {
    ...packageJson,
    scripts: scriptsA,
    dependencies,
    devDependencies: devDependenciesA,
  }

  const contentA = JSON.stringify(packageJsonA, null, 2)
  await fs.writeFile(PACKAGE_JSON, contentA)
}

// Remove devDependencies used only for initialization
const shouldKeepDevDependency = function (key) {
  return DEV_DEPENDENCIES.includes(key)
}

const DEV_DEPENDENCIES = [
  '@netlify/build',
  'ava',
  'cross-env',
  'eslint',
  'eslint-config-prettier',
  'eslint-plugin-import',
  'eslint-plugin-node',
  'eslint-plugin-prettier',
  'execa',
  'netlify-cli',
  'prettier',
  'release-it',
]
