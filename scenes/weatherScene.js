import { Composer, Scenes } from 'telegraf'
import { weatherRequest } from '../requests/weatherRequest.js'

//===================================================================================

export const weatherWizard = new Composer()
weatherWizard.on('text', async ctx => {
    ctx.wizard.state.data = {}
    ctx.reply('Введи название населённого пункта')
    return ctx.wizard.next()
})

//===================================================================================

export const city = new Composer()
city.on('text', async ctx => {
    const location = (ctx.wizard.state.data.city = ctx.message.text)
    const weatherText = await weatherRequest(location)
    ctx.reply(weatherText)
    return ctx.scene.leave()
})

//===================================================================================

export const weatherScene = new Scenes.WizardScene(
    'weatherScene',
    weatherWizard,
    city
)
