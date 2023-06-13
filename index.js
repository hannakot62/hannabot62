import { Telegraf } from 'telegraf'
import { message } from 'telegraf/filters'
import { helpText } from './const/helpText.js'
import { btnOptions } from './options.js'
import 'dotenv/config'
import { pictureRequest } from './requests/pictureRequest.js'
import stickersMap from './const/stickersMap.js'
import { weatherRequest } from './requests/weatherRequest.js'

const token = process.env.TELEGRAM_BOT_ACCESS_TOKEN

const bot = new Telegraf(token)
bot.telegram.setMyCommands([
    { command: '/start', description: 'Начальное приветствие' },
    { command: '/help', description: 'Подскажет тебе о возможностях бота' },
    { command: '/weather', description: 'Текущая погода в твоём городе!' },
    {
        command: '/cat',
        description: 'Если захотелось посмотреть на котиков'
    },
    {
        command: '/dog',
        description: 'Если захотелось посмотреть на собачек'
    }
])

bot.start(async ctx => {
    await ctx.reply('Bonjour')
    await ctx.replyWithSticker(stickersMap.get('hello'))
    const username = ctx.message.chat.username
    await bot.telegram.sendMessage(
        process.env.CHAT_ID_FOR_LOGS,
        username + ': logged'
    )
})
bot.help(ctx => ctx.reply(helpText))
bot.on(message('sticker'), ctx => ctx.reply('👍'))
bot.hears('hi', ctx => ctx.reply('Hey there'))

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
            // let data = ''
            // console.log(navigator)
            // global.navigator.geolocation.getCurrentPosition(
            //     position => console.log(position),
            //     erroe => console.log(erroe)
            // )
            // // console.log(data)
            const response = await weatherRequest('Нарочь')
            await ctx.reply(response)
            break
        }
        case '/cat': {
            const pictureURL = await pictureRequest('cat')
            await ctx.replyWithPhoto(pictureURL)
            break
        }
        case '/dog': {
            const pictureURL = await pictureRequest('dog')
            ctx.replyWithPhoto(pictureURL)
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

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

// bot.on('callback_query', async msg => {
//     const data = msg.data
//     const chatId = msg.message.chat.id
//     console.log(msg)
//     await bot.sendMessage(chatId, 'ахахха ты выбрал ' + data)
// })
