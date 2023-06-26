import axios from 'axios'
import { RAPID_API_KEY, RAPID_API_KEY_HOST_FOOD } from '#environmentVars'
import { oops } from '#vars'
import { restaurantsURL } from '#urls'

export async function restaurantsRequest(lat, lon) {
    let restaurants
    await axios
        .request({
            method: 'get',
            url: restaurantsURL,
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
        .then(response => {
            restaurants = response.data.data ?? oops
        })
        .catch(err => (restaurants = oops))
    return restaurants
}
