export async function weatherNotificationNoTime(ctx) {
    return `Я не совсем понял, в какое время лучше отправлять уведомления, поэтому теперь ежедневно в 08:00 😅 ты будешь получать данные о погоде в
📍${ctx.wizard.state.data.city}

Если захочешь отписаться - под каждым уведомлением есть кнопка😉`
}
