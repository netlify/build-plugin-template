// Trim a string and Titleize it
export const trimTitleize = function (string) {
  const stringA = string.trim()

  if (stringA === '') {
    return ''
  }

  return `${stringA[0].toUpperCase()}${stringA.slice(1)}`
}

export const trim = function (string) {
  return string.trim()
}
