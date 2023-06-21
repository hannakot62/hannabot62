import { Composer, Scenes } from 'telegraf'
import { cityRequest } from '../requests/cityRequest.js'
import { attractionsRequest } from '../requests/attractionsRequest.js'
import { getAttractionsText } from '../helpers/getAttractionsText.js'

export const attractionsWizard = new Composer()
attractionsWizard.on('callback_query', async ctx => {
    ctx.wizard.state.data = {}
    await ctx.reply('Введи название населённого пункта')
    return ctx.wizard.next()
})

export const cityAttractions = new Composer()
cityAttractions.on('text', async ctx => {
    const location = (ctx.wizard.state.data.city = ctx.message.text)
    const cityObj = await cityRequest(location)

    if (typeof cityObj === 'string') {
        await ctx.reply(cityObj)
        return ctx.scene.leave()
    }
    if (cityObj?.status === 'NOT_FOUND' || cityObj?.status === 'BAD_REQUEST') {
        await ctx.reply('Не могу ничего найти об этом населённом пункте')
        return ctx.scene.leave()
    }

    const attractions = await attractionsRequest(cityObj.lat, cityObj.lon)
    const attractionsText = getAttractionsText(attractions)

    await ctx.replyWithHTML(attractionsText)
    return ctx.scene.leave()
})

export const attractionsScene = new Scenes.WizardScene(
    'attractionsScene',
    attractionsWizard,
    cityAttractions
)
