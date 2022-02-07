import { username } from 'username'
import { execaCommand } from 'execa'

import { trim } from './trim.js'

// {{author}} template variable
export const AUTHOR_VARIABLE = {
  name: 'author',
  description: 'Author name',
  // Try to guess current username
  async default() {
    const { stdout } = await execaCommand('git config user.name', {
      reject: false,
    })
    if (stdout !== '') {
      return stdout
    }

    return username()
  },
  filter: trim,
}
