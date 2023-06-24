import { Composer, Scenes } from 'telegraf'
import { getRestaurantsText, validateCityRecommendHelper } from '#helpers'
import { restaurantsRequest } from '#requests'
import { enterCityName } from '#vars'
import { updateComposer } from './composers/composersCheckIfCommand.js'

//================================================================================

export const foodWizard = new Composer()
foodWizard.on('callback_query', async ctx => {
    ctx.wizard.state.data = {}
    await ctx.reply(enterCityName)
    return ctx.wizard.next()
})

//================================================================================

export let cityFood = new Composer()
cityFood = updateComposer(cityFood, async ctx => {
    const cityObj = await validateCityRecommendHelper(ctx)
    if (!cityObj?.lat) return ctx.scene.leave()

    const restaurants = await restaurantsRequest(cityObj.lat, cityObj.lon)
    const restaurantsText = getRestaurantsText(restaurants)

    await ctx.replyWithHTML(restaurantsText, {
        disable_web_page_preview: true
    })
    return ctx.scene.leave()
})

//================================================================================

export const foodScene = new Scenes.WizardScene(
    'foodScene',
    foodWizard,
    cityFood
)
