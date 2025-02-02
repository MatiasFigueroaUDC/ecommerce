import * as SQLite from 'expo-sqlite'

export const init = async () => { //Para iniciar la base de datos
    try {
        const db = await SQLite.openDatabaseAsync("session.db") //Crea la base de datos o te conecta si ya existe
        const createTable = await db.execAsync(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS sessionUser (
                localId TEXT PRIMARY KEY NOT NULL,
                email TEXT NOT NULL,
                idToken TEXT NOT NULL);`
        )
        return createTable
    } catch (error) {
        return error
    }
}

export const insertSession = async (localId, email, idToken) => { //Para insertar una sesión
    try {
        const db = await SQLite.openDatabaseAsync("session.db") //Crea la base de datos o te conecta si ya existe
        const newSession = await db.runAsync(`INSERT INTO sessionUser (localId, email, idToken) VALUES (?, ?, ?)`, [localId, email, idToken])
        return newSession
    } catch (error) {
        return error
    }
}

export const fetchSession = async () => { //Para obtener una sesión
    try {
        const db = await SQLite.openDatabaseAsync("session.db") //Crea la base de datos o te conecta si ya existe
        const sessionUser = await db.getFirstAsync(`SELECT * FROM sessionUser`)
        return sessionUser
    } catch (error) {
        return error
    }
}

export const deleteSession = async () => { //Para eliminar una sesión
    try {
        const db = await SQLite.openDatabaseAsync("session.db") //Crea la base de datos o te conecta si ya existe
        const deleteSession = await db.runAsync(`DELETE FROM sessionUser`)
        return deleteSession
    } catch (error) {
        return error
    }
}
