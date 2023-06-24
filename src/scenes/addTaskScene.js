import { Composer, Scenes } from 'telegraf'
import {
    askAboutTaskNotification,
    checkCommandsHandler,
    validateDate,
    validateTime
} from '#helpers'
import {
    added,
    enterTaskDate,
    enterTaskDescription,
    enterTaskName,
    enterTaskTime,
    tryAddTaskAgain
} from '#vars'
import { updateComposer } from '#composers/composersCheckIfCommand.js'

//===================================================================================

export const addTaskWizard = new Composer()
addTaskWizard.on('callback_query', async ctx => {
    ctx.wizard.state.data = {}
    await ctx.reply(enterTaskName)
    return ctx.wizard.next()
})

//===================================================================================

export let title = new Composer()
title = updateComposer(title, async ctx => {
    if (checkCommandsHandler(ctx.message.text, ctx, ctx.scene.state.bot)) {
        return ctx.scene.leave()
    }
    ctx.wizard.state.data.title = ctx.message.text
    await ctx.reply(enterTaskDescription)
    return ctx.wizard.next()
})

//===================================================================================

export let description = new Composer()
description = updateComposer(description, async ctx => {
    ctx.wizard.state.data.description = ctx.message.text
    await ctx.reply(enterTaskDate)
    return ctx.wizard.next()
})

//===================================================================================

export let addTaskDate = new Composer()
addTaskDate = updateComposer(addTaskDate, async ctx => {
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

export let addTaskTime = new Composer()
addTaskTime = updateComposer(addTaskTime, async ctx => {
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

    await ctx.reply(added)
    await askAboutTaskNotification(ctx, insertedId)

    return ctx.scene.leave()
})

//===================================================================================

export const addTaskScene = new Scenes.WizardScene(
    'addTaskScene',
    addTaskWizard,
    title,
    description,
    addTaskDate,
    addTaskTime
)
