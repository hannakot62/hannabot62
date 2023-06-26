import axios from 'axios'
import { ATTRACTIONS_ACCESS_KEY } from '#environmentVars'
import { oops } from '#vars'
import { cityURL } from '#urls'

export async function cityRequest(city) {
    let cityObj
    await axios
        .get(cityURL, {
            params: { apikey: ATTRACTIONS_ACCESS_KEY, name: city }
        })
        .then(async response => {
            cityObj = await response.data
        })
        .catch(err => {
            cityObj = oops
        })
    return cityObj
}
