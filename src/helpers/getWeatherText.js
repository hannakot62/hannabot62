import { weatherEmojiMap } from '../const/weatherEmoji.js'
import dayjs from 'dayjs'

export function getWeatherText(weatherObj) {
    const icon = getIcon(weatherObj) ?? ''
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