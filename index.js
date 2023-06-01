import TelegramAPI from 'node-telegram-bot-api'
import { btnOptions } from './options.js'
import 'dotenv/config'
import { pictureRequest } from './requests/pictureRequest.js'
import { helpText } from './helpers/helpText.js'
import stickersMap from './helpers/stickersMap.js'

const token = process.env.TELEGRAM_BOT_ACCESS_TOKEN

const bot = new TelegramAPI(token, {
    polling: true
})

bot.setMyCommands([
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

bot.on('message', async msg => {
    const text = msg.text
    const chatId = msg.chat.id
    console.log(msg)
    switch (text) {
        case '/start': {
            await bot.sendMessage(chatId, 'Bonjour')
            await bot.sendSticker(chatId, stickersMap.get('hello'))
            break
        }
        case '/help': {
            await bot.sendMessage(chatId, helpText)
            break
        }
        case '/buttons': {
            await bot.sendMessage(chatId, 'сейчас вылетит кнопка')
            await bot.sendMessage(chatId, 'Кнопку заказывали?', btnOptions)
            break
        }
        case '/weather': {
            break
        }
        case '/cat': {
            const pictureURL = await pictureRequest('cat')
            bot.sendPhoto(chatId, pictureURL)
            break
        }
        case '/dog': {
            const pictureURL = await pictureRequest('dog')
            bot.sendPhoto(chatId, pictureURL)
            break
        }
        default: {
            await bot.sendMessage(
                chatId,
                'Мы говорим на разных языках... Попробуй воспользоваться командой /help'
            )
            break
        }
    }

    console.log(msg)
})

bot.on('callback_query', async msg => {
    const data = msg.data
    const chatId = msg.message.chat.id
    console.log(msg)
    await bot.sendMessage(chatId, 'ахахха ты выбрал ' + data)
})
