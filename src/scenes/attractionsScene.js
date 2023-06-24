import { Composer, Scenes } from 'telegraf'
import { getAttractionsText, validateCityRecommendHelper } from '#helpers'
import { attractionsRequest } from '#requests'
import { enterCityName } from '#vars'
import { updateComposer } from './composers/composersCheckIfCommand.js'

//================================================================================

export const attractionsWizard = new Composer()
attractionsWizard.on('callback_query', async ctx => {
    ctx.wizard.state.data = {}
    await ctx.reply(enterCityName)
    return ctx.wizard.next()
})

//================================================================================

export let cityAttractions = new Composer()
cityAttractions = updateComposer(cityAttractions, async ctx => {
    const cityObj = await validateCityRecommendHelper(ctx)
    if (!cityObj?.lat) return ctx.scene.leave()

    const attractions = await attractionsRequest(cityObj.lat, cityObj.lon)
    const attractionsText = getAttractionsText(attractions)

    await ctx.replyWithHTML(attractionsText)
    return ctx.scene.leave()
})

//================================================================================

export const attractionsScene = new Scenes.WizardScene(
    'attractionsScene',
    attractionsWizard,
    cityAttractions
)
