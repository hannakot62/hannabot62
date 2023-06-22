import dayjs from 'dayjs'
import { weekDaysTranslationMap } from '../const/index.js'
import { checkIfArrayBadResponse } from './checkIfArrayBadResponse.js'

export function getEventsText(events) {
    let text = ''

    const result = checkIfArrayBadResponse(events)
    if (result) return result

    events = events.filter(event => dayjs(event.date) > dayjs())
    events.sort((a, b) => dayjs(a.date) - dayjs(b.date))
    events.forEach(event => {
        event.date = dayjs(event.date).format('DD/MM/YYYY')
        let item = `
📌<b><em>Название: ${event.name}</em></b>
🗓️Когда: ${weekDaysTranslationMap.get(event.day)} ${event.date}

`
        text += item
    })
    return text
}
