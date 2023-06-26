import axios from 'axios'
import { ATTRACTIONS_ACCESS_KEY } from '#environmentVars'
import { foundNothingHere, oops } from '#vars'
import { attractionsURL } from '#urls'

export async function attractionsRequest(lat, lon) {
    let attractions
    await axios
        .get(attractionsURL, {
            params: {
                apikey: ATTRACTIONS_ACCESS_KEY,
                radius: 1000,
                limit: 15,
                lon,
                lat
            }
        })
        .then(response => {
            attractions = response.data.features
        })
        .catch(err => {
            if (err.response.status === 400 || err.response.status === 404) {
                attractions = foundNothingHere
            } else {
                attractions = oops
            }
        })
    return attractions
}
