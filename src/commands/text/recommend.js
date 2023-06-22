import { Markup } from 'telegraf'
import { recommendText } from '../../const/vars/index.js'

export async function recommend(ctx) {
    await ctx.reply(
        recommendText,
        Markup.inlineKeyboard([
            [Markup.button.callback('Достопримечательности🗺️', '/attractions')],
            [
                Markup.button.callback('События📆', '/events'),
                Markup.button.callback('Еда🍽️', '/food')
            ]
        ])
    )
}
