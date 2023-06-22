import dayjs from 'dayjs'
import { getTasksText } from '../../helpers/index.js'

export async function todayTasks(ctx, db) {
    const tasksCollection = await db.collection('tasks')
    const id = ctx.update.callback_query.message.chat.id
    let tasks = await tasksCollection.find({ chatID: id }).toArray()
    tasks = tasks.filter(
        task => dayjs(dayjs()).format('DD.MM.YYYY') === task.date
    )
    const responseText = getTasksText(tasks)
    await ctx.replyWithHTML(responseText)
}
