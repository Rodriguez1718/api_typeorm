import { Router } from "express";
import usersRouter from "../controllers/users.controller";

const router = Router();

router.use("/", usersRouter);

console.log("users.routes loaded");

export default router;
