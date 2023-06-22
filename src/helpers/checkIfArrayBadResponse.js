import { foundNothing } from '../const/vars/index.js'

export function checkIfArrayBadResponse(array) {
    if (!Array.isArray(array)) return array
    if (array.length === 0) return foundNothing
    return false
}
