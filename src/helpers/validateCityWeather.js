import { weatherRequest } from '#requests'
import { oops, unknownCity } from '#vars'

export async function validateCityWeather(city) {
    let res = await weatherRequest(city)
    if (res === unknownCity || res === oops) return res
    return 'ok'
}
