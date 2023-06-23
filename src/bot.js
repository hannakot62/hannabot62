import { Scenes, session, Telegraf } from 'telegraf'
import {
    addTaskScene,
    attractionsScene,
    createTaskNotificationScene,
    eventsScene,
    foodScene,
    weatherScene,
    weatherSubscribeScene
} from './scenes/index.js'
import { botCommands, start, textMessage } from './commands/index.js'
import { helpText } from './const/index.js'
import { message } from 'telegraf/filters'
import { allTasks, todayTasks } from './commands/actions/index.js'
import { TELEGRAM_BOT_ACCESS_TOKEN } from './const/environmentVars/environmentVars.js'
import { lol, nicePic, unsubscribedSuccessfully } from './const/vars/index.js'

export const setup = db => {
    const bot = new Telegraf(TELEGRAM_BOT_ACCESS_TOKEN)
    bot.use(session(db))

    const stage = new Scenes.Stage([
        weatherScene,
        attractionsScene,
        eventsScene,
        foodScene,
        weatherSubscribeScene,
        addTaskScene,
        createTaskNotificationScene
    ])
    bot.use(stage.middleware())
    bot.telegram.setMyCommands(botCommands)

    //=========================================================================================

    bot.start(async ctx => {
        await start(ctx, db, bot)
    })

    bot.help(async ctx => await ctx.reply(helpText))
    bot.on(message('sticker'), ctx => ctx.reply(nicePic))
    bot.hears('хахаха', ctx => ctx.reply(lol))

    //=========================================================================================

    bot.action('/attractions', async ctx => {
        await ctx.scene.enter('attractionsScene', { db, bot })
    })
    bot.action('/events', async ctx => {
        await ctx.scene.enter('eventsScene', { db, bot })
    })
    bot.action('/food', async ctx => {
        await ctx.scene.enter('foodScene', { db, bot })
    })

    //=========================================================================================

    bot.action('/allTasks', async ctx => {
        await allTasks(ctx, db)
    })
    bot.action('/addTask', async ctx => {
        await ctx.scene.enter('addTaskScene', { db, bot })
    })
    bot.action('/todayTasks', async ctx => {
        await todayTasks(ctx, db)
    })

    //=========================================================================================
    //Использование регулярного выражения для передачи id чата в качестве набора любых символов в определённом месте: скобки
    bot.action(/^\/create_task_notification_(.+)$/, async ctx => {
        await ctx.answerCbQuery()
        await ctx.scene.enter('createTaskNotificationScene', {
            id: ctx.match[1],
            db,
            bot
        })
    })
    bot.action('/do_not_create_task_notification', async ctx => {
        await ctx.answerCbQuery()
        await ctx.reply('Ну ладно :)')
    })

    //=========================================================================================
    //Использование регулярного выражения для передачи идентификатора интервала
    // в качестве набора любых символов в определённом месте: скобки
    bot.action(/^\/weather_unsubscribe_(.+)$/, async ctx => {
        clearInterval(JSON.parse(ctx.match[1]))
        await ctx.reply(unsubscribedSuccessfully)
    })

    //=========================================================================================

    bot.on(message('text'), async ctx => {
        await textMessage(ctx, bot, db)
    })

    // Enable graceful stop
    process.once('SIGINT', () => bot.stop('SIGINT'))
    process.once('SIGTERM', () => bot.stop('SIGTERM'))
    return bot
}
