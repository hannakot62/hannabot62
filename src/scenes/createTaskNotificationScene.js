import { Composer, Scenes } from 'telegraf'
import { ObjectId } from 'mongodb'
import schedule from 'node-schedule'
import {
    getTaskNotificationText,
    validateDate,
    validateTime
} from '../helpers/index.js'
import {
    cantGetTaskNotificationDate,
    cantGetTaskNotificationTime,
    enterTaskNotificationDate,
    enterTaskNotificationTime,
    ready
} from '../const/vars/index.js'
import { updateComposer } from './composers/composersCheckIfCommand.js'

//===================================================================================

export const createTaskNotificationWizard = new Composer()
createTaskNotificationWizard.on('callback_query', async ctx => {
    ctx.wizard.state.data = {}
    const { id, db } = ctx.scene.state
    const tasksCollection = await db.collection('tasks')
    ctx.wizard.state.data.lastInserted = await tasksCollection.findOne({
        _id: new ObjectId(id)
    })
    await ctx.reply(enterTaskNotificationDate)
    return ctx.wizard.next()
})

//===================================================================================

export let createTaskDate = new Composer()
createTaskDate = updateComposer(createTaskDate, async ctx => {
    const dateValid = validateDate(ctx.message.text)
    if (!dateValid) {
        await ctx.reply(cantGetTaskNotificationDate)
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
    await ctx.reply(enterTaskNotificationTime)
    return ctx.wizard.next()
})

//===================================================================================

export let createTaskTime = new Composer()
createTaskTime = updateComposer(createTaskTime, async ctx => {
    let timeValid = validateTime(ctx.message.text)
    if (!timeValid) {
        await ctx.reply(cantGetTaskNotificationTime)
        timeValid = { hours: '08', minutes: '00' }
    }

    const date = ctx.wizard.state.data.date
    const notifyMoment = new Date(
        +date.year,
        +date.month - 1,
        +date.day,
        +timeValid.hours - 3,
        +timeValid.minutes
    )

    const job = schedule.scheduleJob(notifyMoment, async () => {
        await ctx.replyWithHTML(
            getTaskNotificationText(ctx.wizard.state.data.lastInserted)
        )
    })

    await ctx.reply(ready)
    return ctx.scene.leave()
})

//===================================================================================

export const createTaskNotificationScene = new Scenes.WizardScene(
    'createTaskNotificationScene',
    createTaskNotificationWizard,
    createTaskDate,
    createTaskTime
)
