import axios from 'axios'
import {
    RAPID_API_KEY,
    RAPID_API_KEY_HOST_FOOD
} from '../const/environmentVars/environmentVars.js'
import { oops } from '../const/vars/index.js'

export async function restaurantsRequest(lat, lon) {
    let restaurants
    await axios
        .request({
            method: 'get',
            url: `https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng`,
            params: {
                distance: '10',
                open_now: 'false',
                lunit: 'km',
                latitude: lat,
                longitude: lon
            },

            headers: {
                'X-RapidAPI-Key': RAPID_API_KEY,
                'X-RapidAPI-Host': RAPID_API_KEY_HOST_FOOD
            }
        })
        .then(response => (restaurants = response.data.data))
        .catch(err => (restaurants = oops))
    return restaurants
}
