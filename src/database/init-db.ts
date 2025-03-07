import mysql from "mysql2/promise";
import { config } from "../config/config";

export async function createDatabaseIfNotExists() {
    const { host, port, user, password, database } = config.database;
    console.log(`Connecting to MySQL at ${host}:${port} as ${user}`);
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
    console.log(`Database "${database}" created or already exists.`);
    await connection.end();
}
