import { Composer, Scenes } from 'telegraf'
import {
    getTimeToNotification,
    validateCityWeather,
    validateTime,
    weatherNotification
} from '../helpers/index.js'
import {
    weatherNotificationAddedText,
    weatherNotificationNoTime
} from '../const/index.js'
import {
    enterCityName,
    enterWeatherNotificationTime,
    tryOtherCommands
} from '../const/vars/index.js'

//===================================================================================

export const weatherSubscribeWizard = new Composer()
weatherSubscribeWizard.on('text', async ctx => {
    ctx.wizard.state.data = {}
    await ctx.reply(enterCityName)
    return ctx.wizard.next()
})

//===================================================================================

export const cityWeatherSubscribe = new Composer()
cityWeatherSubscribe.on('text', async ctx => {
    const response = await validateCityWeather(ctx.message.text)
    if (response !== 'ok') {
        await ctx.reply(response)
        await ctx.reply(tryOtherCommands)
        return ctx.scene.leave()
    }
    ctx.wizard.state.data.city = ctx.message.text
    await ctx.reply(enterWeatherNotificationTime)
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
            DayInMs
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
