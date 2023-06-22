import { Composer, Scenes } from 'telegraf'
import { validateTime } from '../helpers/validateTime.js'
import { validateDate } from '../helpers/validateDate.js'
import { askAboutTaskNotification } from '../helpers/askAboutTaskNotification.js'

//===================================================================================

export const addTaskWizard = new Composer()
addTaskWizard.on('callback_query', async ctx => {
    ctx.wizard.state.data = {}
    await ctx.reply('Введи название задачи')
    return ctx.wizard.next()
})

//===================================================================================

export const title = new Composer()
title.on('text', async ctx => {
    ctx.wizard.state.data.title = ctx.message.text
    await ctx.reply('Введи описание задачи')
    return ctx.wizard.next()
})

//===================================================================================

export const description = new Composer()
description.on('text', async ctx => {
    ctx.wizard.state.data.description = ctx.message.text
    await ctx.reply(
        'Введи дату задачи в формате DD.MM.YYYY (например 26.01.2023)'
    )
    return ctx.wizard.next()
})

//===================================================================================

export const date = new Composer()
date.on('text', async ctx => {
    const dateValid = validateDate(ctx.message.text)
    if (!dateValid) {
        await ctx.reply('Попробуй добавить эту задачу заново...')
        return ctx.scene.leave()
    }
    ctx.wizard.state.data.date = dateValid
    await ctx.reply('Введи время задачи в формате HH:mm (например 09:47)')
    return ctx.wizard.next()
})
//===================================================================================

export const time = new Composer()
time.on('text', async ctx => {
    const timeValid = validateTime(ctx.message.text)
    if (!timeValid) {
        await ctx.reply('Попробуй добавить эту задачу заново...')
        return ctx.scene.leave()
    }
    ctx.wizard.state.data.time = ctx.message.text

    const title = ctx.wizard.state.data.title
    const description = ctx.wizard.state.data.description
    const date = `${ctx.wizard.state.data.date.day}\.${ctx.wizard.state.data.date.month}\.${ctx.wizard.state.data.date.year}`
    const time = `${timeValid.hours}\:${timeValid.minutes}`
    const task = { title, description, date, time }

    const db = ctx.scene.state.db
    const tasksCollection = await db.collection('tasks')
    const lastInserted = await tasksCollection.insertOne(task)
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
