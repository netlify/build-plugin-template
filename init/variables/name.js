const { getRepo } = require('./repo.js')

// {{name}} template variable
const NAME_VARIABLE = {
  name: 'name',
  description: 'Plugin name',
  async default() {
    const repo = await getRepo()
    if (repo === undefined) {
      return 'example'
    }
    const [, repoName] = repo.split('/')
    return repoName
  },
  filter(value) {
    return value.trim().replace('netlify-plugin-', '')
  },
  // Try to enforce netlify-plugin-* convention
  validate(value) {
    const blacklistedWord = NAME_BLACKLIST.find(word =>
      value.toLowerCase().includes(word),
    )
    if (blacklistedWord !== undefined) {
      return `Cannot contain the word ${blacklistedWord}`
    }
  },
}

const NAME_BLACKLIST = ['netlify', 'plugin', 'addon', 'build']

module.exports = { NAME_VARIABLE }
