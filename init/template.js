import { promises as fs } from 'fs'
import { fileURLToPath } from 'url'

import fastGlob from 'fast-glob'

const PACKAGE_ROOT = fileURLToPath(new URL('..', import.meta.url))
// Files that have template variables
const TEMPLATES = ['*.{json,md}', '{src,.github}/**']

// Substitute template variables {{var}} in all source files
export const applyTemplates = async function (variables) {
  const templates = TEMPLATES.map(addPackageRoot)
  const files = await fastGlob(templates)
  await Promise.all(files.map((file) => applyTemplate(file, variables)))
}

const addPackageRoot = function (path) {
  return `${PACKAGE_ROOT}/${path}`
}

const applyTemplate = async function (file, variables) {
  const content = await fs.readFile(file, 'utf8')
  const contentA = replaceVariables(content, variables)
  await fs.writeFile(file, contentA)
}

const replaceVariables = function (content, variables) {
  const contentA = Object.entries(variables).reduce(replaceVariable, content)
  if (variables.nodeVersion === undefined) {
    return contentA
  }
  // `package.json` `name` field cannot include {{}}. Otherwise `npm install`
  // and `npm run` do not work.
  const contentB = contentA.replace(
    DUMMY_NAME,
    `netlify-plugin-${variables.name}`,
  )
  // `package.json` `engines.version` cannot be {{}}. Otherwise some ESLint
  // rules do not work
  const contentC = contentB.replace(NODE_VERSION, variables.nodeVersion)
  return contentC
}

const replaceVariable = function (content, [name, value]) {
  const regExp = new RegExp(`{{${name}}}`, 'g')
  return content.replace(regExp, value)
}

const DUMMY_NAME = 'netlify-plugin-example'
const NODE_VERSION = '^12.20.0 || ^14.14.0 || >=16.0.0'
