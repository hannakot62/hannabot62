import axios from 'axios'

export async function eventsRequest(countryCode) {
    let response = await axios.get(
        `https://holidays-by-api-ninjas.p.rapidapi.com/v1/holidays`,
        {
            params: {
                country: countryCode,
                year: new Date().getFullYear()
            },
            headers: {
                'X-RapidAPI-Key': process.env.RAPID_API_KEY,
                'X-RapidAPI-Host': process.env.RAPID_API_HOST_FOR_EVENTS
            }
        }
    )
    return response.data
}
