import express from "express";
import cors from "cors";
import usersRouter from "./src/routes/users.routes";
import { errorHandler } from "./src/middlewares/error-handler";
import { AppDataSource } from "./src/database/data-source";
import { createDatabaseIfNotExists } from "./src/database/init-db";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/users", usersRouter);
app.use(errorHandler);

const port = process.env.PORT || 4000;

(async () => {
    try {
        // Create the database if it doesn't exist
        await createDatabaseIfNotExists();
        console.log("Database created or already exists.");

        // Attempt to close an existing connection if it exists
        if (AppDataSource.isInitialized) {
            try {
                await AppDataSource.destroy();
                console.log("Previous connection closed.");
            } catch (error) {
                // If the connection isn't established, log and ignore the error
                console.error("Error closing connection (ignored):", error.message);
            }
        }

        // Now initialize the connection
        await AppDataSource.initialize();
        console.log("Database connected successfully");

        app.listen(port, () =>
            console.log(`Server listening on port ${port}`)
        );
    } catch (error) {
        console.error("Error during server startup", error);
    }
})();
