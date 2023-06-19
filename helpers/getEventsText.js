import { weekDaysTranslationMap } from '../const/weekDaysTranslationMap.js'
import dayjs from 'dayjs'

export function getEventsText(events) {
    let text = ''
    events = events.filter(event => dayjs(event.date) > dayjs())
    events.sort((a, b) => dayjs(a.date) - dayjs(b.date))
    events.forEach(event => {
        event.date = dayjs(event.date).format('DD/MM/YYYY')
        let item = `
📌Название: ${event.name}
🗓️Когда: ${weekDaysTranslationMap.get(event.day)} ${event.date}

`
        text += item
    })
    return text
}
