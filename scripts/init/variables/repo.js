const gitRemoteOriginUrl = require('git-remote-origin-url')

const { trim } = require('./trim.js')

// {{repo}} template variable
const REPO_VARIABLE = {
  name: 'repo',
  description: 'Source code repository',
  // Try to guess the current repository's user/repo
  async default({ name, author }) {
    try {
      const url = await gitRemoteOriginUrl()
      const [, repo] = url.split(':')
      return repo.replace('.git', '')
    } catch (error) {
      return `${author}/${name}`
    }
  },
  filter: trim,
}

module.exports = { REPO_VARIABLE }
