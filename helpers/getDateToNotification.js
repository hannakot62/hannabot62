export function getDateToNotification(day, month, year, hours, minutes) {
    let ms = 0
    let now = new Date()
    let notifyMoment = new Date()
    notifyMoment.setFullYear(+year, +month - 1, +day)
    notifyMoment.setHours(+hours, +minutes)
    console.log(notifyMoment)

    ms = notifyMoment.getTime() - now.getTime()
    console.log(ms)
    return ms > 0 ? ms : 0
}
