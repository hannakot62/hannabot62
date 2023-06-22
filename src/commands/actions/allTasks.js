import { getTasksText } from '../../helpers/index.js'

export async function allTasks(ctx, db) {
    const tasksCollection = await db.collection('tasks')
    const id = ctx.update.callback_query.message.chat.id
    const tasks = await tasksCollection.find({ chatID: id }).toArray()

    const responseText = getTasksText(tasks)
    await ctx.replyWithHTML(responseText)
}
