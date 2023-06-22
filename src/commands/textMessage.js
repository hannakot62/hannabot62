import { pictureRequest } from '../requests/index.js'
import { recommend, tasks } from './text/index.js'

export async function textMessage(ctx) {
    const text = ctx.message.text
    switch (text) {
        case '/weather': {
            await ctx.scene.enter('weatherScene')
            break
        }
        case '/cat': {
            const pictureURL = await pictureRequest('cat')
            await ctx.replyWithPhoto(pictureURL)
            break
        }
        case '/dog': {
            const pictureURL = await pictureRequest('dog')
            await ctx.replyWithPhoto(pictureURL)
            break
        }
        case '/weather_subscribe': {
            await ctx.scene.enter('weatherSubscribeScene')
            break
        }
        case '/recommend': {
            await recommend(ctx)
            break
        }
        case '/tasks': {
            await tasks(ctx)
            break
        }
        default: {
            await ctx.reply(
                'Мы говорим на разных языках... Попробуй воспользоваться командой /help'
            )
            break
        }
    }
}
