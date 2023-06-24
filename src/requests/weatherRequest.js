import axios from 'axios'
import { getWeatherText } from '#helpers'
import { WEATHER_ACCESS_TOKEN } from '#environmentVars'
import { oops, unknownCity } from '#vars'

export const weatherRequest = async cityName => {
    let result = ''
    await axios
        .get(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=ru&units=metric&appid=${WEATHER_ACCESS_TOKEN}`
        )
        .then(function (response) {
            result = getWeatherText(response.data)
        })
        .catch(err => {
            if (err.response.status === 400 || err.response.status === 404) {
                result = unknownCity
            } else result = oops
        })
    return result
}
