import { Markup } from 'telegraf'
import { askAboutTaskNotificationReply } from '#vars'

export async function askAboutTaskNotification(ctx, insertedId) {
    await ctx.reply(
        askAboutTaskNotificationReply,
        Markup.inlineKeyboard([
            Markup.button.callback(
                'Да',
                `/create_task_notification_${insertedId}`
            ),
            Markup.button.callback('Нет', '/do_not_create_task_notification')
        ])
    )
}
