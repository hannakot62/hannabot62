export async function weatherNotificationAddedText(ctx) {
    return `Готово! Теперь ежедневно в ${ctx.message.text} ты будешь получать данные о погоде в
📍${ctx.wizard.state.data.city} 

Если захочешь отписаться - под каждым уведомлением есть кнопка😉`
}
