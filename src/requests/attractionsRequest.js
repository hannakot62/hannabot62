import axios from 'axios'
import { ATTRACTIONS_ACCESS_KEY } from '../const/environmentVars/environmentVars.js'

export async function attractionsRequest(lat, lon) {
    let attractions
    await axios
        .get(
            `http://api.opentripmap.com/0.1/ru/places/radius?apikey=${ATTRACTIONS_ACCESS_KEY}`,
            { params: { radius: 1000, limit: 15, lon, lat } }
        )
        .then(response => {
            attractions = response.data.features
        })
        .catch(err => {
            if (err.response.status === 400 || err.response.status === 404) {
                attractions = 'Не могу ничего найти об этом населённом пункте'
            } else {
                attractions = 'Упс... Что-то пошло не так :('
            }
        })
    return attractions
}
