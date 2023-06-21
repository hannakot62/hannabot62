import { Composer, Scenes } from 'telegraf'
import { cityRequest } from '../requests/cityRequest.js'
import { eventsRequest } from '../requests/eventsRequest.js'
import { getEventsText } from '../helpers/getEventsText.js'
import { restaurantsRequest } from '../requests/restaurantsRequest.js'
import { getRestaurantsText } from '../helpers/getRestaurantsText.js'

export const foodWizard = new Composer()
foodWizard.on('callback_query', async ctx => {
    ctx.wizard.state.data = {}
    await ctx.reply('Введи название населённого пункта')
    return ctx.wizard.next()
})

export const cityFood = new Composer()
cityFood.on('text', async ctx => {
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

    const restaurants = await restaurantsRequest(cityObj.lat, cityObj.lon)
    const restaurantsText = getRestaurantsText(restaurants)

    await ctx.replyWithHTML(restaurantsText, {
        disable_web_page_preview: true
    })
    return ctx.scene.leave()
})

export const foodScene = new Scenes.WizardScene(
    'foodScene',
    foodWizard,
    cityFood
)
