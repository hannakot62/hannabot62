import { Composer, Scenes } from 'telegraf'
import { getEventsText, validateCityRecommendHelper } from '#helpers'
import { eventsRequest } from '#requests'
import { enterCityName } from '#vars'
import { updateComposer } from './composers/composersCheckIfCommand.js'

//================================================================================

export const eventsWizard = new Composer()
eventsWizard.on('callback_query', async ctx => {
    ctx.wizard.state.data = {}
    await ctx.reply(enterCityName)
    return ctx.wizard.next()
})

//================================================================================

export let cityEvents = new Composer()
cityEvents = updateComposer(cityEvents, async ctx => {
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
