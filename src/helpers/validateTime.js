export function validateTime(string) {
    const validTimeRegExp = /^(?:(0[0-9]|1[0-9]|2[0-3])):([0-5][0-9])$/
    const match = string.match(validTimeRegExp)
    return match ? { hours: match[1], minutes: match[2] } : null
}

//Валидация времени с помощью регулярного выражения:
//
// две группы (от начала и до конца выражения):
//     - часы (комбинации: "0 и любая цифра кроме 0", "1 и любая цифра", "2 и цифры от 0 до 3")
//     - минуты ("цифра от 0 до 5 и цифра от 0 до 9")
