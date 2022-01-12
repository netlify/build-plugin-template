import { trimTitleize } from './trim.js'

// {{description}} template variable
export const DESCRIPTION_VARIABLE = {
  name: 'description',
  description: 'Description',
  default: 'Example description',
  filter: trimTitleize,
}
