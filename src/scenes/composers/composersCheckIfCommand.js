import { checkCommandsHandler, executeCommand } from '#helpers'

export function updateComposer(comp, handler) {
    return comp.on('text', async ctx => {
        const { db, bot } = ctx.scene.state
        if (checkCommandsHandler(ctx.message.text)) {
            await ctx.scene.leave()
            await executeCommand(ctx.message.text, ctx, db, bot)
        } else {
            await handler(ctx)
        }
    })
}
