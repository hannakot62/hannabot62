import { Composer, Scenes } from 'telegraf'
import {
    getAttractionsText,
    validateCityRecommendHelper
} from '../helpers/index.js'
import { attractionsRequest } from '../requests/index.js'
import { enterCityName } from '../const/vars/index.js'
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
