import dayjs from 'dayjs'
import { checkIfArrayBadResponse } from '#helpers'
import { weekDaysTranslationMap } from '#const'

export function getEventsText(events) {
    let text = ''

    const result = checkIfArrayBadResponse(events)
    if (result) return result

    events
        .filter(event => dayjs(event.date) > dayjs())
        .sort((a, b) => dayjs(a.date) - dayjs(b.date))
        .forEach(event => {
            event.date = dayjs(event.date).format('DD/MM/YYYY')
            let item = `
📌<b><em>Название: ${event.name}</em></b>
🗓️Когда: ${weekDaysTranslationMap.get(event.day)} ${event.date}

`
            text += item
        })
    return text
}
