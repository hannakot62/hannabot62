export async function addUser(db, username, chatID) {
    const usersCollection = await db.collection('users')
    return await usersCollection.insertOne({ username, chatID })
}
