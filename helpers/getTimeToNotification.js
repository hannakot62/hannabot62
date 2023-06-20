export function getTimeToNotification(hours, minutes) {
    let ms = 0
    let now = new Date()
    let notifyMoment = new Date()
    notifyMoment.setHours(hours, minutes, 0)
    if (notifyMoment.getTime() < now.getTime())
        notifyMoment = new Date(notifyMoment.getTime() + 86400000)
    ms = notifyMoment.getTime() - now.getTime()
    console.log(ms)
    return ms
}
