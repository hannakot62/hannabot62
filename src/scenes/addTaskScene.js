import { Composer, Scenes } from 'telegraf'
import {
    askAboutTaskNotification,
    validateDate,
    validateTime
} from '../helpers/index.js'
import {
    enterTaskDate,
    enterTaskDescription,
    enterTaskName,
    enterTaskTime,
    tryAddTaskAgain
} from '../const/vars/index.js'

//===================================================================================

export const addTaskWizard = new Composer()
addTaskWizard.on('callback_query', async ctx => {
    ctx.wizard.state.data = {}
    await ctx.reply(enterTaskName)
    return ctx.wizard.next()
})

//===================================================================================

export const title = new Composer()
title.on('text', async ctx => {
    ctx.wizard.state.data.title = ctx.message.text
    await ctx.reply(enterTaskDescription)
    return ctx.wizard.next()
})

//===================================================================================

export const description = new Composer()
description.on('text', async ctx => {
    ctx.wizard.state.data.description = ctx.message.text
    await ctx.reply(enterTaskDate)
    return ctx.wizard.next()
})

//===================================================================================

export const date = new Composer()
date.on('text', async ctx => {
    const dateValid = validateDate(ctx.message.text)
    if (!dateValid) {
        //TODO change reject logic
        await ctx.reply(tryAddTaskAgain)
        return ctx.scene.leave()
    }
    ctx.wizard.state.data.date = dateValid
    await ctx.reply(enterTaskTime)
    return ctx.wizard.next()
})
//===================================================================================

export const time = new Composer()
time.on('text', async ctx => {
    const timeValid = validateTime(ctx.message.text)
    if (!timeValid) {
        await ctx.reply(tryAddTaskAgain)
        return ctx.scene.leave()
    }
    ctx.wizard.state.data.time = ctx.message.text

    const chatID = ctx.message.chat.id
    const title = ctx.wizard.state.data.title
    const description = ctx.wizard.state.data.description
    const date = `${ctx.wizard.state.data.date.day}\.${ctx.wizard.state.data.date.month}\.${ctx.wizard.state.data.date.year}`
    const time = `${timeValid.hours}\:${timeValid.minutes}`
    const task = { title, description, date, time, chatID }

    const db = ctx.scene.state.db
    const tasksCollection = await db.collection('tasks')
    const lastInserted = await tasksCollection.insertOne({
        ...task
    })
    const insertedId = lastInserted.insertedId

    await ctx.reply('Добавил!')
    await askAboutTaskNotification(ctx, insertedId)

    return ctx.scene.leave()
})

//===================================================================================

export const addTaskScene = new Scenes.WizardScene(
    'addTaskScene',
    addTaskWizard,
    title,
    description,
    date,
    time
)
