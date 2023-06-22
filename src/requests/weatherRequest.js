import axios from 'axios'
import { getWeatherText } from '../helpers/index.js'

export const weatherRequest = async cityName => {
    let result = ''
    await axios
        .get(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=ru&units=metric&appid=${process.env.WEATHER_ACCESS_TOKEN}`
        )
        .then(function (response) {
            result = getWeatherText(response.data)
        })
        .catch(err => {
            if (err.response.status === 400 || err.response.status === 404) {
                result = 'Я пока не знаю такого населённого пункта'
            } else result = 'Упс... Что-то пошло не так :('
        })
    return result
}
