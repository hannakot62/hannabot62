import axios from 'axios'
import { weatherEmojiMap } from '../const/weatherEmoji.js'
import dayjs from 'dayjs'

export function getWeatherText(weatherObj) {
    const icon = getIcon(weatherObj)
    const sunrise = dayjs.unix(weatherObj.sys.sunrise).format('HH:mm')
    const sunset = dayjs.unix(weatherObj.sys.sunset).format('HH:mm')

    return `
📍${weatherObj.name}: ${weatherObj.weather[0].description} ${icon}
Температура на данный момент: ${weatherObj.main.temp} °C

Ощущается как ${weatherObj.main.feels_like} °C
Минимальная температура: ${weatherObj.main.temp_max} °C
Максимальная температура: ${weatherObj.main.temp_min} °C
Влажность: ${weatherObj.main.humidity}%
Скорость ветра: ${weatherObj.wind.speed} м/с
Видимость: ${weatherObj.visibility} метров

🌅 Рассвет: ${sunrise}
🌄 Закат: ${sunset}
    `
}
function getIcon(weatherObj) {
    return weatherEmojiMap.get(weatherObj.weather[0].icon)
}

// {
//     coord: { lon: 26.707, lat: 54.9083 },
//     weather: [ { id: 804, main: 'Clouds', description: 'пасмурно', icon: '04d' } ],
//         base: 'stations',
//     main: {
//     temp: 293.04,
//         feels_like: 292.21,
//         temp_min: 293.04,
//         clouds: { all: 100 },
//     dt: 1686654951,
//         sys: { country: 'BY', sunrise: 1686620094, sunset: 1686682291 },
//     timezone: 10800,
//         id: 624804,
//         name: 'Нарочь',
//         cod: 200
// }
