import { getTasksText } from '#helpers'
import { getTasksByUserId } from '#dbOperations'

export async function allTasks(ctx, db) {
    const id = ctx.update.callback_query.message.chat.id
    const tasks = await getTasksByUserId(db, id)
    const responseText = getTasksText(tasks)
    await ctx.replyWithHTML(responseText)
}
