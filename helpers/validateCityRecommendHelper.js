import { cityRequest } from '../requests/cityRequest.js'

export async function validateCityRecommendHelper(ctx) {
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
    return cityObj
}
