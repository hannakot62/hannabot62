import { Markup } from 'telegraf'

export async function askAboutTaskNotification(ctx, insertedId) {
    await ctx.reply(
        'Может быть необходимо напоминание?',
        Markup.inlineKeyboard([
            Markup.button.callback(
                'Да',
                `/create_task_notification_${insertedId}`
            ),
            Markup.button.callback('Нет', '/do_not_create_task_notification')
        ])
    )
}
