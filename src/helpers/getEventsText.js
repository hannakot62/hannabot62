import dayjs from 'dayjs'
import { weekDaysTranslationMap } from '../const/index.js'

export function getEventsText(events) {
    let text = ''
    if (!Array.isArray(events)) return events
    if (events.length === 0) return 'Я ничего не нашёл :('
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
