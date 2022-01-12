import inquirer from 'inquirer'
import inquirerAutocomplete from 'inquirer-autocomplete-prompt'
import chalk from 'chalk'

import { NAME_VARIABLE } from './name.js'
import { DESCRIPTION_VARIABLE } from './description.js'
import { AUTHOR_VARIABLE } from './author.js'
import { EMAIL_VARIABLE } from './email.js'
import { LICENSE_VARIABLE } from './license.js'
import { REPO_VARIABLE } from './repo.js'
import { NODE_VERSION_VARIABLE } from './node_version.js'

inquirer.registerPrompt('autocomplete', inquirerAutocomplete)

// Retrieve all template variables from either options or CLI interactive prompt
export const getVariables = async function (options) {
  console.log(
    chalk.bold('\nWhich Netlify Build plugin would you like to create?\n'),
  )

  const questions = VARIABLES.filter(
    ({ name }) => options[name] === undefined,
  ).map(getQuestion)
  const values = await inquirer.prompt(questions)
  const year = getCurrentYear()
  return { ...values, year }
}

// Each template variable
export const VARIABLES = [
  NAME_VARIABLE,
  DESCRIPTION_VARIABLE,
  AUTHOR_VARIABLE,
  EMAIL_VARIABLE,
  LICENSE_VARIABLE,
  REPO_VARIABLE,
  NODE_VERSION_VARIABLE,
]

// Retrieve inquirer question
const getQuestion = function ({
  type = 'input',
  name,
  description,
  default: defaultValue,
  source,
  filter,
  validate,
}) {
  return {
    type,
    name,
    message: description,
    default: defaultValue,
    source,
    filter,
    validate: validateAnswer.bind(null, validate),
  }
}

// All questions are required
const validateAnswer = function (validate, value) {
  if (value === '') {
    return 'Required'
  }

  if (validate === undefined) {
    return true
  }

  const message = validate(value)
  if (message === undefined) {
    return true
  }
  return message
}

const getCurrentYear = function () {
  return String(new Date().getYear() + YEAR_BASE)
}

const YEAR_BASE = 1900
