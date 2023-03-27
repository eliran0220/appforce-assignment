import {connection} from "../db.js";

export async function getDepartments() {
    try {
        const sql = `SELECT * FROM DEPARTMENT;`
        const result = await connection.query(sql);
        const departments = JSON.parse(JSON.stringify(result[0]));
        return departments;
    } catch (err) {
        console.log(err);
        throw err.code;
    }
}

export async function insertDepartment(values) {
    try {
        const sql = `INSERT INTO DEPARTMENT (Name,Description) VALUES (?,?);`;
        const result = await connection.query(sql,values);
        const department = JSON.parse(JSON.stringify(result[0]));
        return department;
    } catch (err) {
        console.log(err);
        throw err.code;
    }
}

export async function getInfo() {
    const sql = `SELECT D.Name, D.Description, Count(*) AS usersCount FROM DEPARTMENT AS D JOIN USER AS U ON D.Id = U.Department GROUP BY D.Id`;
    const result = await connection.query(sql);
    const info = JSON.parse(JSON.stringify(result[0]))
    return info;
}