import axios from 'axios'

export const weatherRequest = async cityName => {
    await axios
        .get(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=ru&appid=${process.env.WEATHER_ACCESS_TOKEN}`
        )
        .then(function (response) {
            // обработка успешного запроса
            console.log(response.data)
        })
        .catch(err => {
            console.log('bad city')
            return 'Я пока не знаю такого населённого пункта'
        })
}
