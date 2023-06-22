import { Composer, Scenes } from 'telegraf'
import { cityRequest } from '../requests/cityRequest.js'
import { restaurantsRequest } from '../requests/restaurantsRequest.js'
import { getRestaurantsText } from '../helpers/getRestaurantsText.js'
import { validateCityRecommendHelper } from '../helpers/validateCityRecommendHelper.js'

//================================================================================

export const foodWizard = new Composer()
foodWizard.on('callback_query', async ctx => {
    ctx.wizard.state.data = {}
    await ctx.reply('Введи название населённого пункта')
    return ctx.wizard.next()
})

//================================================================================

export const cityFood = new Composer()
cityFood.on('text', async ctx => {
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