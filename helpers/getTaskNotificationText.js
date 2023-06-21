export function getTaskNotificationText(task) {
    return `НАПОМИНАЮ❗❗❗
    
<b>🔔${task.title}</b>

🗓️Когда: ${task.date}
⏰Во сколько: ${task.time}

<em>${task.description}</em>
    `
}
