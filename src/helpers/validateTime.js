export function validateTime(string) {
    const validTimeRegExp = /^(?:(0[0-9]|1[0-9]|2[0-3])):([0-5][0-9])$/
    const match = string.match(validTimeRegExp)
    return match ? { hours: match[1], minutes: match[2] } : null
}
