import { Composer, Scenes } from 'telegraf'
import { cityRequest } from '../requests/cityRequest.js'
import { eventsRequest } from '../requests/eventsRequest.js'
import { getEventsText } from '../helpers/getEventsText.js'
import { validateCityRecommendHelper } from '../helpers/validateCityRecommendHelper.js'

//================================================================================

export const eventsWizard = new Composer()
eventsWizard.on('callback_query', async ctx => {
    ctx.wizard.state.data = {}
    await ctx.reply('Введи название населённого пункта')
    return ctx.wizard.next()
})

//================================================================================

export const cityEvents = new Composer()
cityEvents.on('text', async ctx => {
    const cityObj = await validateCityRecommendHelper(ctx)
    if (!cityObj?.country) return ctx.scene.leave()

    const events = await eventsRequest(cityObj.country)
    const eventsText = getEventsText(events)

    await ctx.replyWithHTML(eventsText)
    return ctx.scene.leave()
})

//================================================================================

export const eventsScene = new Scenes.WizardScene(
    'eventsScene',
    eventsWizard,
    cityEvents
)