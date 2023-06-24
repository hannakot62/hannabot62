import axios from 'axios'
import { ATTRACTIONS_ACCESS_KEY } from '#environmentVars'
import { oops } from '#vars'

export async function cityRequest(city) {
    let cityObj
    await axios
        .get(
            `http://api.opentripmap.com/0.1/ru/places/geoname?apikey=${ATTRACTIONS_ACCESS_KEY}`,
            { params: { name: city } }
        )
        .then(async response => {
            cityObj = await response.data
        })
        .catch(err => {
            cityObj = oops
        })
    return cityObj
}
