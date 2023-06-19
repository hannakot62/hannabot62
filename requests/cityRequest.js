import axios from 'axios'

export async function cityRequest(city) {
    let response = await axios.get(
        `http://api.opentripmap.com/0.1/ru/places/geoname?apikey=${process.env.ATTRACTIONS_ACCESS_KEY}`,
        { params: { name: city } }
    )
    let cityObj = await response.data
    console.log(cityObj)
    return cityObj
}
