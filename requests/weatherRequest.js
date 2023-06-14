import axios from 'axios'
import { getWeatherText } from '../helpers/getWeatherText.js'

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
            console.log('bad city')
            result = 'Я пока не знаю такого населённого пункта'
        })
    return result
}
