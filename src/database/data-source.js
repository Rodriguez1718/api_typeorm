"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const config_1 = require("../config/config");
const User_1 = require("../entities/User");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: config_1.config.database.host,
    port: config_1.config.database.port,
    username: config_1.config.database.user,
    password: config_1.config.database.password,
    database: config_1.config.database.database,
    synchronize: true, // Change to false in production
    logging: false,
    entities: [User_1.User],
});
exports.AppDataSource.initialize()
    .then(() => console.log("Database connected successfully"))
    .catch((error) => console.error("Database connection error:", error));
