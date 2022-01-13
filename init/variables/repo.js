import gitRemoteOriginUrl from 'git-remote-origin-url'

import { trim } from './trim.js'

// {{repo}} template variable
export const REPO_VARIABLE = {
  name: 'repo',
  description: 'Source code repository',
  // Try to guess the current repository's user/repo
  async default({ name, author }) {
    const repo = await getRepo()
    if (repo === undefined) {
      return `${author}/${name}`
    }
    return repo
  },
  filter: trim,
}

export const getRepo = async function () {
  try {
    const url = await gitRemoteOriginUrl()
    const [, repo] = url.split(':')
    return repo.replace('.git', '')
  } catch (error) {
    return
  }
}
