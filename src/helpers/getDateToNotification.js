export function getDateToNotification(day, month, year, hours, minutes) {
    let ms = 0
    const now = new Date()
    const notifyMoment = new Date()
    notifyMoment.setFullYear(+year, +month - 1, +day)
    notifyMoment.setHours(+hours, +minutes)

    ms = notifyMoment.getTime() - now.getTime()
    return ms > 0 ? ms : 0
}
