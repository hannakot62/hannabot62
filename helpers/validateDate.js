export function validateDate(string) {
    const validDateRegExp = /(^0[1-9]|[12][0-9]|3[01]).(0[1-9]|1[0-2]).(\d{4})$/
    const match = string.match(validDateRegExp)
    return match ? { day: match[1], month: match[2], year: match[3] } : null
}
