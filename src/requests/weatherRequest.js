import axios from 'axios'
import { getWeatherText } from '#helpers'
import { WEATHER_ACCESS_TOKEN } from '#environmentVars'
import { oops, unknownCity } from '#vars'
import { weatherURL } from '#urls'

export const weatherRequest = async cityName => {
    let result = ''
    await axios
        .get(weatherURL, {
            params: {
                appid: WEATHER_ACCESS_TOKEN,
                q: cityName
            }
        })
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
