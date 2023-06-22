import { Markup } from 'telegraf'
import { tasksText } from '../../const/vars/index.js'

export async function tasks(ctx) {
    await ctx.reply(
        tasksText,
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
