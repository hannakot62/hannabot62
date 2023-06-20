import { Markup, Scenes, session, Telegraf } from 'telegraf'
import stickersMap from './const/stickersMap.js'
import { helpText } from './const/helpText.js'
import { message } from 'telegraf/filters'
import { btnOptions } from './options.js'
import { pictureRequest } from './requests/pictureRequest.js'
import { weatherScene } from './scenes/weatherScene.js'
import { attractionsScene } from './scenes/attractionsScene.js'

import { BotCommands } from './commands/BotCommands.js'
import { eventsScene } from './scenes/eventsScene.js'
import { foodScene } from './scenes/foodScene.js'
import { weatherSubscribeScene } from './scenes/weatherSubscribeScene.js'

export const setup = db => {
    // session middleware MUST be initialized
    // before any commands or actions that require sessions
    const bot = new Telegraf(process.env.TELEGRAM_BOT_ACCESS_TOKEN)
    bot.use(session(db))
    const stage = new Scenes.Stage([
        weatherScene,
        attractionsScene,
        eventsScene,
        foodScene,
        weatherSubscribeScene
    ])
    bot.use(stage.middleware())

    bot.telegram.setMyCommands(BotCommands)

    bot.start(async ctx => {
        const username =
            ctx.message.chat.username ||
            ctx.message.chat.first_name ||
            'дружище'

        const chatID = ctx.message.chat.id

        const usersCollection = await db.collection('users')
        const user = await usersCollection.findOne({ chatID })
        console.log(user)
        if (!user) {
            await ctx.reply(`Добро пожаловать, ${username}!
С возможностями бота ты можешь ознакомиться вызвав команду /help`)
            await ctx.replyWithSticker(stickersMap.get('deal'))
            await usersCollection.insertOne({ username, chatID })
        } else {
            await ctx.reply(`Я тебя узнал, ${username}! 😅
Привет!`)
            await ctx.replyWithSticker(stickersMap.get('hello'))
        }

        await bot.telegram.sendMessage(
            process.env.CHAT_ID_FOR_LOGS,
            username + ': logged'
        )
    })
    bot.help(ctx => ctx.reply(helpText))
    bot.on(message('sticker'), ctx => ctx.reply('прикольная картинка :)'))
    bot.hears('хахаха', ctx => ctx.reply('аахахаххахахахах'))

    bot.action('/attractions', async ctx => {
        await ctx.scene.enter('attractionsScene')
    })
    bot.action('/events', async ctx => {
        await ctx.scene.enter('eventsScene')
    })
    bot.action('/food', async ctx => {
        await ctx.scene.enter('foodScene')
    })
    bot.action(/^\/weather_unsubscribe_(.+)$/, async ctx => {
        clearInterval(JSON.parse(ctx.match[1]))
        clearTimeout(JSON.parse(ctx.match[1]))
        await ctx.reply('Успешная отписка 👍')
    })
    bot.on(message('text'), async ctx => {
        console.log(ctx.message)
        const text = ctx.message.text
        const chatId = ctx.message.chat.id
        switch (text) {
            case '/buttons': {
                await bot.sendMessage(chatId, 'сейчас вылетит кнопка')
                await bot.sendMessage(chatId, 'Кнопку заказывали?', btnOptions)
                break
            }
            case '/weather': {
                await ctx.scene.enter('weatherScene')
                break
            }
            case '/cat': {
                const pictureURL = await pictureRequest('cat')
                await ctx.replyWithPhoto(pictureURL)
                break
            }
            case '/dog': {
                const pictureURL = await pictureRequest('dog')
                await ctx.replyWithPhoto(pictureURL)
                break
            }
            case '/weather_subscribe': {
                await ctx.scene.enter('weatherSubscribeScene')
                break
            }
            case '/recommend': {
                await ctx.reply(
                    'Могу предложить тебе список достопримечательностей, событий или' +
                        ' мест, где можно вкусно поесть, по городу, который ты укажешь. Выбирай!🤗',
                    Markup.inlineKeyboard([
                        [
                            Markup.button.callback(
                                'Достопримечательности🗺️',
                                '/attractions'
                            )
                        ],
                        [
                            Markup.button.callback('События📆', '/events'),
                            Markup.button.callback('Еда🍽️', '/food')
                        ]
                    ])
                )
                break
            }
            case '/tasks': {
                await ctx.reply(
                    'Что ты хочешь сделать?',
                    Markup.inlineKeyboard([
                        [
                            Markup.button.callback(
                                'Вывести все задачи📚',
                                '/allTasks'
                            )
                        ],
                        [
                            Markup.button.callback(
                                'Добавить задачу📝',
                                '/addTask'
                            )
                        ],
                        [
                            Markup.button.callback(
                                'Вывести задачи на сегодня📗',
                                '/todayTasks'
                            )
                        ]
                    ])
                )
                break
            }
            default: {
                await ctx.reply(
                    'Мы говорим на разных языках... Попробуй воспользоваться командой /help'
                )
                break
            }
        }
    })

    // Enable graceful stop
    process.once('SIGINT', () => bot.stop('SIGINT'))
    process.once('SIGTERM', () => bot.stop('SIGTERM'))
    return bot
}

// bot.on('callback_query', async msg => {
//     const data = msg.data
//     const chatId = msg.message.chat.id
//     console.log(msg)
//     await bot.sendMessage(chatId, 'ахахха ты выбрал ' + data)
// })
