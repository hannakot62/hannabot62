import { pictureRequest } from '../requests/index.js'
import { recommend, tasks } from './text/index.js'
import { defaultReply } from '../const/vars/index.js'

export async function textMessage(ctx, bot, db) {
    const text = ctx.message.text
    console.log('=============================', db)
    switch (text) {
        case '/weather': {
            await ctx.scene.enter('weatherScene', { bot, db })
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
            await ctx.scene.enter('weatherSubscribeScene', { bot, db })
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
            await ctx.reply(defaultReply)
            break
        }
    }
}
