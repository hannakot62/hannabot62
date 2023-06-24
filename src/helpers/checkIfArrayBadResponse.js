import { foundNothing } from '#vars'

export function checkIfArrayBadResponse(array) {
    if (!Array.isArray(array)) return array
    if (array.length === 0) return foundNothing
    return false
}
