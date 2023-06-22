import { Composer, Scenes } from 'telegraf'
import { validateTime } from '../helpers/validateTime.js'
import { validateDate } from '../helpers/validateDate.js'
import { ObjectId } from 'mongodb'
import { getTaskNotificationText } from '../helpers/getTaskNotificationText.js'
import schedule from 'node-schedule'

//===================================================================================

export const createTaskNotificationWizard = new Composer()
createTaskNotificationWizard.on('callback_query', async ctx => {
    ctx.wizard.state.data = {}
    const id = ctx.scene.state.id
    const db = ctx.scene.state.db
    const tasksCollection = await db.collection('tasks')
    ctx.wizard.state.data.lastInserted = await tasksCollection.findOne({
        _id: new ObjectId(id)
    })
    await ctx.reply(
        'Введи дату для напоминания о задаче в формате DD.MM.YYYY (например 26.01.2023)'
    )
    return ctx.wizard.next()
})

//===================================================================================

export const date = new Composer()
date.on('text', async ctx => {
    const dateValid = validateDate(ctx.message.text)
    if (!dateValid) {
        await ctx.reply('Я не понял... Поставлю на день задачи!')
        const [day, month, year] =
            ctx.wizard.state.data.lastInserted.date.split('.')
        ctx.wizard.state.data.date = {
            day,
            month,
            year
        }
    } else {
        ctx.wizard.state.data.date = dateValid
    }
    await ctx.reply(
        'Введи время для напоминания о задаче в формате HH:mm (например 09:47)'
    )
    return ctx.wizard.next()
})

//===================================================================================

export const time = new Composer()
time.on('text', async ctx => {
    let timeValid = validateTime(ctx.message.text)
    if (!timeValid) {
        await ctx.reply('Я не понял... Поставлю на 08:00...')
        timeValid = { hours: '08', minutes: '00' }
    }

    const date = ctx.wizard.state.data.date
    const notifyMoment = new Date(
        +date.year,
        +date.month - 1,
        +date.day,
        +timeValid.hours,
        +timeValid.minutes
    )

    const job = schedule.scheduleJob(notifyMoment, async () => {
        await ctx.replyWithHTML(
            getTaskNotificationText(ctx.wizard.state.data.lastInserted)
        )
    })

    await ctx.reply('Готово!')
    return ctx.scene.leave()
})

//===================================================================================

export const createTaskNotificationScene = new Scenes.WizardScene(
    'createTaskNotificationScene',
    createTaskNotificationWizard,
    date,
    time
)
