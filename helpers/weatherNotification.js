import { weatherRequest } from '../requests/weatherRequest.js'
import { Markup } from 'telegraf'

export async function weatherNotification(ctx, city, interval) {
    const weatherText = await weatherRequest(city)
    await ctx.reply(
        weatherText,
        Markup.inlineKeyboard([
            [
                Markup.button.callback(
                    'Отписаться️ ❌',
                    `/weather_unsubscribe_${interval}`
                )
            ]
        ])
    )
}
