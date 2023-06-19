import axios from 'axios'

export async function restaurantsRequest(lat, lon) {
    let response = await axios.request({
        method: 'get',
        url: `https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng`,
        params: {
            distance: '10',
            open_now: 'false',
            lunit: 'km',
            lang: 'ru',
            latitude: lat,
            longitude: lon
        },
        headers: {
            'X-RapidAPI-Key': process.env.RAPID_API_KEY,
            'X-RapidAPI-Host': process.env.RAPID_API_KEY_HOST_FOOD
        }
    })
    return response.data.data
}
