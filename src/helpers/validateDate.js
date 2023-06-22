export function validateDate(string) {
    const validDateRegExp = /(^0[1-9]|[12][0-9]|3[01]).(0[1-9]|1[0-2]).(\d{4})$/
    const match = string.match(validDateRegExp)
    return match ? { day: match[1], month: match[2], year: match[3] } : null
}

//Валидация даты с помощью регулярного выражения:
//
// три группы:
//     - число (комбинации: "0 и любая цифра кроме 0", "1 или 2 и любая цифра", "3 и 0 или 1")
//     - месяц (комбинации: "0 и любая цифра кроме 0", "1 и цифра от 0 до 2")
//     - год ("4 цифры")
