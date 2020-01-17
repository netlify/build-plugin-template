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
    const valueA = value.trim()
    return NAME_BLACKLIST.reduce(filterValue, valueA)
  },
  // Try to enforce netlify-plugin-* convention
  validate(value) {
    const blacklistedWord = NAME_BLACKLIST.find((word) =>
      value.toLowerCase().includes(word),
    )
    if (blacklistedWord !== undefined) {
      return `Cannot contain the word ${blacklistedWord}`
    }
  },
}

const filterValue = function (value, word) {
  const regExp = new RegExp(`[^\\w]?${word}[^\\w]?`, 'g')
  return value.replace(regExp, '')
}

const NAME_BLACKLIST = ['netlify', 'build', 'plugin', 'addon']

module.exports = { NAME_VARIABLE }
