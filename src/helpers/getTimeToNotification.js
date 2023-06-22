import { DAY_IN_MS } from '../const/DAY_IN_MS.js'

export function getTimeToNotification(hours, minutes) {
    let ms = 0
    const now = new Date()
    let notifyMoment = new Date()
    notifyMoment.setHours(hours - 3, minutes, 0)
    if (notifyMoment.getTime() < now.getTime())
        notifyMoment = new Date(notifyMoment.getTime() + DAY_IN_MS)
    ms = notifyMoment.getTime() - now.getTime()
    return ms
}
