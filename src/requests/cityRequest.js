import axios from 'axios'
import { ATTRACTIONS_ACCESS_KEY } from '../const/environmentVars/environmentVars.js'

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
            cityObj = 'Упс... Что-то пошло не так :('
        })
    return cityObj
}
