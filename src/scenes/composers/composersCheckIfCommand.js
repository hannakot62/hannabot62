import { checkCommandsHandler, executeCommand } from '../../helpers/index.js'

export function updateComposer(comp, handler) {
    return comp.on('text', async ctx => {
        if (checkCommandsHandler(ctx.message.text)) {
            await ctx.scene.leave()
            await executeCommand(ctx.message.text, ctx)
        } else {
            await handler(ctx)
        }
    })
}
