import { cityRequest } from '#requests'
import { foundNothingHere, status400, status404 } from '#vars'

export async function validateCityRecommendHelper(ctx) {
    const location = (ctx.wizard.state.data.city = ctx.message.text)
    const cityObj = await cityRequest(location)

    if (typeof cityObj === 'string') {
        await ctx.reply(cityObj)
        return ctx.scene.leave()
    }
    if (cityObj?.status === status404 || cityObj?.status === status400) {
        await ctx.reply(foundNothingHere)
        return ctx.scene.leave()
    }
    return cityObj
}
