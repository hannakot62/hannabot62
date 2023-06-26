import { enterRecognizedText, enterText, stickersMap } from '#const'
import { CHAT_ID_FOR_LOGS } from '#environmentVars'
import { usernameAlternative } from '#vars'
import { getUserById } from '#dbOperations'
import { addUser } from '#dbOperations'

export async function start(ctx, db, bot) {
    const username =
        ctx.message.chat.username ||
        ctx.message.chat.first_name ||
        usernameAlternative

    const chatID = ctx.message.chat.id
    const user = await getUserById(db, chatID)

    if (!user) {
        await ctx.reply(enterText(username))
        await ctx.replyWithSticker(stickersMap.get('deal'))
        addUser(db, username, chatID)
    } else {
        await ctx.reply(enterRecognizedText(username))
        await ctx.replyWithSticker(stickersMap.get('hello'))
    }

    await bot.telegram.sendMessage(CHAT_ID_FOR_LOGS, username + ': logged')
}
