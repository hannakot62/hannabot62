import { Composer, Scenes } from 'telegraf'
import {
    getTimeToNotification,
    validateCityWeather,
    validateTime,
    weatherNotification
} from '#helpers'
import { weatherNotificationAddedText, weatherNotificationNoTime } from '#const'
import {
    DayInMs,
    enterCityName,
    enterWeatherNotificationTime,
    tryOtherCommands
} from '#vars'
import { updateComposer } from '#composers/composersCheckIfCommand.js'

//===================================================================================

export const weatherSubscribeWizard = new Composer()
weatherSubscribeWizard.on('text', async ctx => {
    ctx.wizard.state.data = {}
    await ctx.reply(enterCityName)
    return ctx.wizard.next()
})

//===================================================================================

export let cityWeatherSubscribe = new Composer()
cityWeatherSubscribe = updateComposer(cityWeatherSubscribe, async ctx => {
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

export let timeWeatherSubscribe = new Composer()
timeWeatherSubscribe = updateComposer(timeWeatherSubscribe, async ctx => {
    let time = validateTime(ctx.message.text)

    if (time) {
        await ctx.reply(await weatherNotificationAddedText(ctx))
    } else {
        time = { hours: '08', minutes: '00' }
        await ctx.reply(await weatherNotificationNoTime(ctx))
    }

    let interval = setTimeout(async () => {
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
