import { weatherRequest } from '../requests/index.js'

export async function validateCityWeather(city) {
    let res = await weatherRequest(city)
    if (
        res === 'Я пока не знаю такого населённого пункта' ||
        res === 'Упс... Что-то пошло не так :('
    )
        return res
    return 'ok'
}
