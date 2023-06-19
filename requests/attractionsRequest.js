import axios from 'axios'

export async function attractionsRequest(lat, lon) {
    let response = await axios.get(
        `http://api.opentripmap.com/0.1/ru/places/radius?apikey=${process.env.ATTRACTIONS_ACCESS_KEY}`,
        { params: { radius: 1000, limit: 15, lon, lat } }
    )
    return response.data.features
}
