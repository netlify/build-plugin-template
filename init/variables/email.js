import { validate as validateEmail } from 'email-validator'
import { execaCommand } from 'execa'

import { trim } from './trim.js'

// {{email}} template variable
export const EMAIL_VARIABLE = {
  name: 'email',
  description: 'Author email address',
  // Try guessing current user's development email
  async default() {
    const { stdout } = await execaCommand('git config user.email', {
      reject: false,
    })
    if (stdout !== '') {
      return stdout
    }

    return 'name@example.com'
  },
  filter: trim,
  validate(value) {
    if (!validateEmail(value)) {
      return 'Invalid email address'
    }
  },
}
