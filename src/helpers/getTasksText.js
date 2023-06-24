import { noTasks } from '#vars'

export function getTasksText(tasks) {
    let text = ''
    if (tasks.length === 0) return noTasks

    tasks.forEach(task => {
        let item = `<b>🖇️ ${task.title}</b>
🗓️ ${task.date}
⏰ ${task.time}
<em>${task.description}</em>

`
        text += item
    })

    return text
}
