export async function getUserById(db, chatID) {
    const usersCollection = await db.collection('users')
    return await usersCollection.findOne({ chatID })
}
