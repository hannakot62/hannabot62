export async function addTask(db, task) {
    const tasksCollection = await db.collection('tasks')
    return await tasksCollection.insertOne({
        ...task
    })
}
