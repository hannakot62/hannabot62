import { Composer, Markup, Scenes } from 'telegraf'
import { validateTime } from '../helpers/validateTime.js'
import { validateCityWeather } from '../helpers/validateCityWeather.js'
import { getTimeToNotification } from '../helpers/getTimeToNotification.js'
import { weatherRequest } from '../requests/weatherRequest.js'

export const weatherSubscribeWizard = new Composer()
weatherSubscribeWizard.on('text', async ctx => {
    ctx.wizard.state.data = {}
    await ctx.reply('Введи название населённого пункта')
    return ctx.wizard.next()
})

export const cityWeatherSubscribe = new Composer()
cityWeatherSubscribe.on('text', async ctx => {
    const response = await validateCityWeather(ctx.message.text)
    if (response !== 'ok') {
        await ctx.reply(response)
        await ctx.reply('Можешь воспользоваться другими командами :)')
        return ctx.scene.leave()
    }
    ctx.wizard.state.data.city = ctx.message.text
    await ctx.reply(
        'Введи время для уведомления в формате HH:mm (например 15:48)'
    )
    return ctx.wizard.next()
})

export const timeWeatherSubscribe = new Composer()
timeWeatherSubscribe.on('text', async ctx => {
    let time = validateTime(ctx.message.text)
    let interval = {}

    if (time) {
        await ctx.reply(
            `Готово! Теперь ежедневно в ${ctx.message.text} ты будешь получать данные о погоде в
📍${ctx.wizard.state.data.city} 

Если захочешь отписаться - под каждым уведомлением есть кнопка😉`
        )
    } else {
        time = { hours: '08', minutes: '00' }
        await ctx.reply(
            `Я не совсем понял, в какое время лучше отправлять уведомления, поэтому теперь ежедневно в 08:00 😅 ты будешь получать данные о погоде в
📍${ctx.wizard.state.data.city}

Если захочешь отписаться - под каждым уведомлением есть кнопка😉`
        )
    }
    interval = setTimeout(async () => {
        const city = ctx.wizard.state.data.city
        interval = setInterval(() => operation(ctx, city), 10000)
        await operation(ctx, city)
    }, getTimeToNotification(+time.hours, +time.minutes))

    async function operation(ctx, city) {
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

    return ctx.scene.leave()
})

export const weatherSubscribeScene = new Scenes.WizardScene(
    'weatherSubscribeScene',
    weatherSubscribeWizard,
    cityWeatherSubscribe,
    timeWeatherSubscribe
)
