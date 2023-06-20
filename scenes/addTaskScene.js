import { Composer, Markup, Scenes } from 'telegraf'

export const addTaskWizard = new Composer()
addTaskWizard.on('callback_query', async ctx => {
    ctx.wizard.state.data = {}
    await ctx.reply('Введи название задачи')
    return ctx.wizard.next()
})

export const title = new Composer()
title.on('text', async ctx => {
    ctx.wizard.state.data.title = ctx.message.text
    await ctx.reply('Введи описание задачи')
    return ctx.wizard.next()
})

export const description = new Composer()
description.on('text', async ctx => {
    ctx.wizard.state.data.description = ctx.message.text
    await ctx.reply('Введи дату задачи')
    return ctx.wizard.next()
})

export const date = new Composer()
date.on('text', async ctx => {
    //валидация даты
    ctx.wizard.state.data.date = ctx.message.text
    await ctx.reply('Введи время задачи')
    return ctx.wizard.next()
})

export const time = new Composer()
time.on('text', async ctx => {
    //валидация времени
    ctx.wizard.state.data.time = ctx.message.text
    const title = ctx.wizard.state.data.title
    const description = ctx.wizard.state.data.description
    const date = ctx.wizard.state.data.date
    const time = ctx.message.text
    console.log('/addTaskToDB_${title},${description},${date},${time}')
    await ctx.reply(
        'Нажми, чтобы добавить',
        Markup.inlineKeyboard([
            [
                Markup.button.callback(
                    'Готово!',
                    `/addTaskToDB_${title},${description},${date},${time}`
                )
            ]
        ])
    )
    return ctx.scene.leave() //напоминания

    await ctx.reply(
        'Добавить напоминаниние?',
        Markup.inlineKeyboard([
            Markup.button.callback('Да', '/create_task_notification'),
            Markup.button.callback('Нет', '/do_not_create_task_notification')
        ])
    )
})

export const addTaskScene = new Scenes.WizardScene(
    'addTaskScene',
    addTaskWizard,
    title,
    description,
    date,
    time
)
