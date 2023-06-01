const TelegramAPI = require('node-telegram-bot-api')
require('dotenv').config()

const token = process.env.TELEGRAM_BOT_ACCESS_TOKEN

const bot = new TelegramAPI(token, {
    polling: true
})

const btnOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [
                { text: 'bubutton', callback_data: 'bubu' },
                { text: 'bubutton1', callback_data: '1' }
            ],
            [
                { text: 'bubutton2', callback_data: '2' },
                { text: 'bubutton3', callback_data: '3' }
            ],
            [
                { text: 'bubutton4', callback_data: '4' },
                { text: 'bubutton5', callback_data: '5' }
            ],
            [
                { text: 'bubutton6', callback_data: '6' },
                { text: 'bubutton7', callback_data: '7' }
            ]
        ]
    })
}

const start = () => {
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
                await bot.sendSticker(
                    chatId,
                    'https://tlgrm.eu/_/stickers/ccd/a8d/ccda8d5d-d492-4393-8bb7-e33f77c24907/1.webp'
                )
                break
            }
            case '/help': {
                await bot.sendMessage(
                    chatId,
                    `Тебе доступны следующие команды:
                
🆘/help - описывает возможности бота, 
☀/weather - подскажет погоду в твоём городе (или не твоём хзхз)
🐱/cat - чудо, а не команда, отправит тебе картинку котика!!!
🐶/dog - отправит тебе картинку собакииии!!!

А вообще ты всегда можешь связаться с разработчиками и задонатить им за такого классного бота (@hannakot62 anywhere) 😅
`
                )
                break
            }
            case '/buttons': {
                await bot.sendMessage(chatId, 'сейчас вылетит кнопка')
                await bot.sendMessage(chatId, 'Кнопку заказывали?', btnOptions)
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

        // await bot.sendMessage(
        //     chatId,
        //     'То есть ты думаешь, это было хорошим решением написать мне ' + text
        // )
        console.log(msg)
    })

    bot.on('callback_query', async msg => {
        const data = msg.data
        const chatId = msg.message.chat.id
        console.log(msg)
        await bot.sendMessage(chatId, 'ахахха ты выбрал ' + data)
    })
}

start()
