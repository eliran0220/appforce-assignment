import mysql from 'mysql2/promise';
export let connection;
export async function getConnection() {
    try {
        if (connection) return connection;
        connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USERNAME,
            password: process.env.MYSQL_ROOT_PASSWORD,
            database: process.env.MYSQL_DATABASE,
          });
          await connection.connect();
          return connection;
    }
    catch (err) {
        console.log(err)
        throw err;
    }
}
export async function initDbTables() {
    try {
        let sql = `CREATE TABLE IF NOT EXISTS DEPARTMENT(
            Id INT PRIMARY KEY AUTO_INCREMENT,
            Name VARCHAR(255) CHECK(length(Name) >= 2),
            Description VARCHAR(255)

        );`
        await connection.query(sql)
        sql = `CREATE TABLE IF NOT EXISTS USER(
            Id INT PRIMARY KEY AUTO_INCREMENT,
            FirstName VARCHAR(255) CHECK(length(FirstName) >= 2),
            LastName VARCHAR(255) CHECK(length(LastName) >= 2),
            Title VARCHAR(255),
            Email VARCHAR(255) UNIQUE,
            Image VARCHAR(255),
            Department INT,
            FOREIGN KEY (Department) REFERENCES DEPARTMENT(Id)
            );`
        await connection.query(sql)
    } catch (err) {
        console.log(err);
        throw err;
    }
};

