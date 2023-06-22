import axios from 'axios'
import {
    RAPID_API_HOST_FOR_EVENTS,
    RAPID_API_KEY
} from '../const/environmentVars/environmentVars.js'
import { oops } from '../const/vars/index.js'

export async function eventsRequest(countryCode) {
    let events
    await axios
        .get(`https://holidays-by-api-ninjas.p.rapidapi.com/v1/holidays`, {
            params: {
                country: countryCode,
                year: new Date().getFullYear()
            },
            headers: {
                'X-RapidAPI-Key': RAPID_API_KEY,
                'X-RapidAPI-Host': RAPID_API_HOST_FOR_EVENTS
            }
        })
        .then(response => (events = response.data))
        .catch(err => (events = oops))
    return events
}
