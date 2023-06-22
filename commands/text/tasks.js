import { Markup } from 'telegraf'

export async function tasks(ctx) {
    await ctx.reply(
        'Что ты хочешь сделать?',
        Markup.inlineKeyboard([
            [Markup.button.callback('Вывести все задачи📚', '/allTasks')],
            [Markup.button.callback('Добавить задачу📝', '/addTask')],
            [
                Markup.button.callback(
                    'Вывести задачи на сегодня📗',
                    '/todayTasks'
                )
            ]
        ])
    )
}
