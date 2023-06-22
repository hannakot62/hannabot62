export function checkIfArrayBadResponse(array) {
    if (!Array.isArray(array)) return array
    if (array.length === 0) return 'Я ничего не нашёл :('
    return false
}
