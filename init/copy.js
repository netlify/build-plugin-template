import cpy from 'cpy'

import { fileURLToPath } from 'url'

const INIT_DIR = fileURLToPath(new URL('.', import.meta.url))
const PACKAGE_ROOT = fileURLToPath(new URL('..', import.meta.url))

// Copy some files during initialization
export const copyFiles = async function () {
  const files = FILES.map((file) => `${INIT_DIR}/${file}`)
  await cpy(files, PACKAGE_ROOT)
}

const FILES = ['README.md']
