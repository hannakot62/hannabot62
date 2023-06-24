import { botCommands, start, textMessage } from '#commands'
import { helpText } from '#const'

export const commands = new Set(botCommands.map(command => command.command))

export function checkCommandsHandler(text) {
    return commands.has(text)
}

export async function executeCommand(text, ctx, db, bot) {
    switch (text) {
        case '/start': {
            await start(ctx, db, bot)
            break
        }
        case '/help': {
            await ctx.reply(helpText)
            break
        }
        default: {
            await textMessage(ctx, bot, db)
            break
        }
    }
}
