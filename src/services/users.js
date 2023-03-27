import {connection} from "../db.js";

export async function getUsers() {
    try {
        const sql = `SELECT * FROM USER`;
        const result = await connection.query(sql);
        const users = JSON.parse(JSON.stringify(result[0]));
        return users;
    } catch (err) {
        console.log(err);
        throw err.code;
    }

}

export async function getUser(id) {
    try {
        const values = [id]
        const sql = `SELECT * FROM USER WHERE ID = ?`;
        const result = await connection.query(sql,values);
        const user = JSON.stringify(result[0])
        return user;
    } catch (err) {
        console.log(err);
        throw err.code;
    }
}

export async function updateUser(id,values) {
    try {
        const sql = `UPDATE USER SET FirstName = ?, LastName = ?, Title = ?, Email = ?, Image = ?, Department = ? WHERE Id = ?;`
        await connection.query(sql,values);
        return id;
    } catch (err) {
        console.log(err);
        throw err.code;
    }
}

export async function deleteUser(values) {
    try {
        const sql = `DELETE FROM USER WHERE ID = ?`;
        await connection.query(sql,values);
        return true;
    } catch (err) {
        console.log(err);
        throw err.code
    }
}

export async function insertUser(values) {
    try {
        const sql = `INSERT INTO USER (FirstName,LastName,Title,Email,Image,Department) VALUES (?,?,?,?,?,?);`;
        const result = await connection.query(sql,values);
        const info = JSON.parse(JSON.stringify(result[0]));
        return info.insertId;
    } catch (err) {
        console.log(err);
        throw err.code;
    }
}