import "reflect-metadata";
import { DataSource } from "typeorm";
import { config } from "../config/config";
import { User } from "../entities/User";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: config.database.host,
    port: config.database.port,
    username: config.database.user,
    password: config.database.password,
    database: config.database.database,
    synchronize: true, // Change to false in production
    logging: false,
    entities: [User],
});

AppDataSource.initialize()
    .then(() => console.log("Database connected successfully"))
    .catch((error) => console.error("Database connection error:", error));
