import 'dotenv/config'
import { MongoClient } from 'mongodb'
import { setup } from './bot.js'
import { MONGO_CONNECTION_STRING } from '#environmentVars'

const initialize = async () => {
    try {
        const db = (
            await MongoClient.connect(MONGO_CONNECTION_STRING, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
        ).db()
        const bot = setup(db)
        await bot.launch()
    } catch (err) {
        console.log(err)
    }
}

initialize()
