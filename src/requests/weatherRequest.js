import axios from 'axios'
import { getWeatherText } from '../helpers/index.js'
import { WEATHER_ACCESS_TOKEN } from '../const/environmentVars/environmentVars.js'
import { oops, unknownCity } from '../const/vars/index.js'

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
