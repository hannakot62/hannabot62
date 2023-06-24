import { enterRecognizedText, enterText, stickersMap } from '#const'
import { CHAT_ID_FOR_LOGS } from '#environmentVars'

export async function start(ctx, db, bot) {
    const username =
        ctx.message.chat.username ||
        ctx.message.chat.first_name ||
        usernameAlternative

    const chatID = ctx.message.chat.id
    const usersCollection = await db.collection('users')
    const user = await usersCollection.findOne({ chatID })

    if (!user) {
        await ctx.reply(enterText(username))
        await ctx.replyWithSticker(stickersMap.get('deal'))
        await usersCollection.insertOne({ username, chatID })
    } else {
        await ctx.reply(enterRecognizedText(username))
        await ctx.replyWithSticker(stickersMap.get('hello'))
    }

    await bot.telegram.sendMessage(CHAT_ID_FOR_LOGS, username + ': logged')
}
