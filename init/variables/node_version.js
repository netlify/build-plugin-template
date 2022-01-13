import semver from 'semver'

import { trim } from './trim.js'

// {{nodeVersion}} template variable
export const NODE_VERSION_VARIABLE = {
  name: 'nodeVersion',
  description: 'Supported Node.js version',
  default: '^12.20.0 || ^14.14.0 || >=16.0.0',
  filter: trim,
  validate(value) {
    if (!semver.validRange(value)) {
      return 'Invalid version range'
    }
  },
}
