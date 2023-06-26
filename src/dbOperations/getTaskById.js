import { ObjectId } from 'mongodb'

export async function getTaskById(db, id) {
    const tasksCollection = await db.collection('tasks')
    return await tasksCollection.findOne({
        _id: new ObjectId(id)
    })
}
