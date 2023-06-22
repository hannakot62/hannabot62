import { weatherRequest } from '../requests/index.js'
import { oops, unknownCity } from '../const/vars/index.js'

export async function validateCityWeather(city) {
    let res = await weatherRequest(city)
    if (res === unknownCity || res === oops) return res
    return 'ok'
}
