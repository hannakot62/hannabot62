import { Composer, Markup, Scenes } from 'telegraf'
import { validateTime } from '../helpers/validateTime.js'
import { validateCityWeather } from '../helpers/validateCityWeather.js'
import { getTimeToNotification } from '../helpers/getTimeToNotification.js'
import { weatherRequest } from '../requests/weatherRequest.js'
import { weatherNotification } from '../helpers/weatherNotification.js'
import { DAY_IN_MS } from '../const/DAY_IN_MS.js'
import { weatherNotificationAddedText } from '../const/weatherNotificationAddedText.js'
import { weatherNotificationNoTime } from '../const/weatherNotificationNoTime.js'

//===================================================================================

export const weatherSubscribeWizard = new Composer()
weatherSubscribeWizard.on('text', async ctx => {
    ctx.wizard.state.data = {}
    await ctx.reply('Введи название населённого пункта')
    return ctx.wizard.next()
})

//===================================================================================

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

//===================================================================================

export const timeWeatherSubscribe = new Composer()
timeWeatherSubscribe.on('text', async ctx => {
    let time = validateTime(ctx.message.text)
    let interval = {}

    if (time) {
        await ctx.reply(await weatherNotificationAddedText(ctx))
    } else {
        time = { hours: '08', minutes: '00' }
        await ctx.reply(await weatherNotificationNoTime(ctx))
    }

    interval = setTimeout(async () => {
        const city = ctx.wizard.state.data.city
        interval = setInterval(
            () => weatherNotification(ctx, city, interval),
            DAY_IN_MS
        )
        await weatherNotification(ctx, city, interval)
    }, getTimeToNotification(+time.hours, +time.minutes))

    return ctx.scene.leave()
})

//===================================================================================

export const weatherSubscribeScene = new Scenes.WizardScene(
    'weatherSubscribeScene',
    weatherSubscribeWizard,
    cityWeatherSubscribe,
    timeWeatherSubscribe
)
