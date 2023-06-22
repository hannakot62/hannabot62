import { DAY_IN_MS } from '../const/DAY_IN_MS.js'

export function getTimeToNotification(hours, minutes) {
    let ms = 0
    const now = new Date()
    let notifyMoment = new Date()
    const timezoneUTCDifference =
        now.getTime() - now.getTimezoneOffset() * 60 * 1000
    notifyMoment.setHours(hours, minutes, 0)
    notifyMoment = new Date(notifyMoment.getTime() - timezoneUTCDifference)
    if (notifyMoment.getTime() < now.getTime())
        notifyMoment = new Date(notifyMoment.getTime() + DAY_IN_MS)

    ms = notifyMoment.getTime() - now.getTime()
    return ms
}
