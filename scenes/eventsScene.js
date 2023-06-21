import { Composer, Scenes } from 'telegraf'
import { cityRequest } from '../requests/cityRequest.js'
import { eventsRequest } from '../requests/eventsRequest.js'
import { getEventsText } from '../helpers/getEventsText.js'

export const eventsWizard = new Composer()
eventsWizard.on('callback_query', async ctx => {
    ctx.wizard.state.data = {}
    await ctx.reply('Введи название населённого пункта')
    return ctx.wizard.next()
})

export const cityEvents = new Composer()
cityEvents.on('text', async ctx => {
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

    const events = await eventsRequest(cityObj.country)
    const eventsText = getEventsText(events)

    await ctx.replyWithHTML(eventsText)
    return ctx.scene.leave()
})

export const eventsScene = new Scenes.WizardScene(
    'eventsScene',
    eventsWizard,
    cityEvents
)
