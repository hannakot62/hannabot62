import { Composer, Scenes } from 'telegraf'
import { weatherRequest } from '#requests'
import { enterCityName } from '#vars'
import { updateComposer } from './composers/composersCheckIfCommand.js'

//===================================================================================

export const weatherWizard = new Composer()
weatherWizard.on('text', async ctx => {
    ctx.wizard.state.data = {}
    ctx.reply(enterCityName)
    return ctx.wizard.next()
})

//===================================================================================

export let cityWeather = new Composer()
cityWeather = updateComposer(cityWeather, async ctx => {
    const location = (ctx.wizard.state.data.city = ctx.message.text)
    const weatherText = await weatherRequest(location)
    ctx.reply(weatherText)
    return ctx.scene.leave()
})

//===================================================================================

export const weatherScene = new Scenes.WizardScene(
    'weatherScene',
    weatherWizard,
    cityWeather
)
