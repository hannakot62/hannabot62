import { Markup } from 'telegraf'

export async function recommend(ctx) {
    await ctx.reply(
        'Могу предложить тебе список достопримечательностей, событий или' +
            ' мест, где можно вкусно поесть, по городу, который ты укажешь. Выбирай!🤗',
        Markup.inlineKeyboard([
            [Markup.button.callback('Достопримечательности🗺️', '/attractions')],
            [
                Markup.button.callback('События📆', '/events'),
                Markup.button.callback('Еда🍽️', '/food')
            ]
        ])
    )
}
