import dayjs from 'dayjs'
import { getTasksText } from '#helpers'
import { getTasksByUserId } from '#dbOperations'

export async function todayTasks(ctx, db) {
    const id = ctx.update.callback_query.message.chat.id
    let tasks = await getTasksByUserId(db, id)
    tasks = tasks.filter(
        task => dayjs(dayjs()).format('DD.MM.YYYY') === task.date
    )
    const responseText = getTasksText(tasks)
    await ctx.replyWithHTML(responseText)
}
