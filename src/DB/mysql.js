import mysql from 'mysql2';
import config from '../config.js'

const dbConfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
}

let conexion = null;

const conectarDb = () => {
    conexion = mysql.createConnection(dbConfig);
    conexion.connect((err) => console.log(!err ? `DB conectada!!!` : `[db err] => ${err}`))
}

conectarDb();

export const findAll = (table) => {
    console.log(`findAll=> table: ${table}`)
    return new Promise((resolve, reject) => {
        conexion.query(
            `SELECT * FROM ${table}`,
            (err, rows) => err ? reject(err) : resolve(rows)
        )
    })
}

export const findByKey = (table, key, value) => {
    console.log(`findByKey=> table: ${table}, key: ${key}, value: ${value}`)
    return new Promise((resolve, reject) => {
        conexion.query(
            `SELECT * FROM ${table} WHERE ${key}= ?`,
            [value],
            (err, rows) => err ? reject(err) : resolve(rows)
        )
    })
}

export const create = (table, key, data) => {
    console.log(`create=> table: ${table} data: ${data}`);
    return new Promise((resolve, reject) => {
        conexion.query(
            `INSERT INTO ${table} SET ?`,
            [data],
            (err, rows) => err ? reject(err) : resolve(findByKey(table, key, rows.insertId).then((reg) => reg[0]))
        )
    })
}

export const deleteByKey = (table, key, value) => {
    console.log(`deleteByKey=> table: ${table}, key: ${key}, value: ${value}`);
    return new Promise(async (resolve, reject) => {
        const temp = await findByKey(table, key, value)
        temp.length !== 0
            ? conexion.query(
                `DELETE FROM ${table} WHERE ${key}= ?`,
                [value],
                (err, rows) => err ? reject(err) : resolve(rows)
            )
            : reject({ msg: 'El registro que intenta eliminar no existe', status: 404 });
    })
}

export const update = (table, key, value, data) => {
    console.log(`update=> table: ${table}, key: ${key}, value: ${value}, data: ${data}`);
    return new Promise(async (resolve, reject) => {
        const temp = await findByKey(table, key, value)
        temp.length !== 0
            ? conexion.query(
                `UPDATE ${table} SET ? WHERE ${key}= ?`,
                [data, value],
                (err, rows) => err ? reject(err) : resolve(findByKey(table, key, value).then((reg) => reg[0]))
            )
            : reject({ msg: 'El registro que intenta actualizar no existe', status: 404 })
    })
}
