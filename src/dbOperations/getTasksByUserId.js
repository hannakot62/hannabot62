export async function getTasksByUserId(db, id) {
    const tasksCollection = await db.collection('tasks')
    return await tasksCollection.find({ chatID: id }).toArray()
}
