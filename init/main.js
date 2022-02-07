import { execaCommand } from 'execa'
import chalk from 'chalk'

import { getOptions } from './options.js'
import { copyFiles } from './copy.js'
import { applyTemplates } from './template.js'
import { cleanRepo } from './clean.js'
// import { createSite } from './site.js'

// `npm run init` main logic.
// Initialize/scaffold the template repository.
export const init = async function (options) {
  const { variables } = await getOptions(options)

  try {
    await copyFiles()
    await applyTemplates(variables)
    await cleanRepo()
    await npmInstall()
    await execaCommand('git add -A')
    await execaCommand('git commit -m Init')
    // Revert changes on errors
  } catch (error) {
    console.error(chalk.red('Error: Initialization failed.'))
    await execaCommand('git reset --hard')
    await npmInstall()
    throw error
  }

  // await createSite(variables)
}

const npmInstall = async function () {
  await execaCommand('npm install --loglevel error --no-audit --no-fund', {
    stdio: 'inherit',
  })
}
