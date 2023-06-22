import { DAY_IN_MS } from '../const/DAY_IN_MS.js'

export function getTimeToNotification(hours, minutes) {
    let ms = 0
    const now = new Date()
    let notifyMoment = new Date()
    const timezoneUTCDifferenceHours = hours + now.getTimezoneOffset() / 60
    notifyMoment.setHours(timezoneUTCDifferenceHours, minutes, 0)
    if (notifyMoment.getTime() < now.getTime())
        notifyMoment = new Date(notifyMoment.getTime() + DAY_IN_MS)
    ms = notifyMoment.getTime() - now.getTime()
    console.log(new Date())
    console.log(new Date().getTimezoneOffset() / 60)
    console.log(notifyMoment)
    console.log(notifyMoment.getTimezoneOffset() / 60)
    return ms
}
