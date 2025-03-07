import { Router, Request, Response, NextFunction } from "express";
import { userService } from "../services/user.service";
import { validateRequest } from "../middlewares/validate-request";
import Joi from "joi";
import { Role } from "../utils/role";
import { User } from "../entities/User";

const usersRouter = Router();

usersRouter.get("/", getAll);
usersRouter.get("/:id", getById);
usersRouter.post("/", createSchema, create);
usersRouter.put("/:id", updateSchema, update);
usersRouter.delete("/:id", _delete);

export default usersRouter;

function getAll(req: Request, res: Response, next: NextFunction): void {
    userService.getAll()
        .then((users: User[]) => res.json(users))
        .catch(next);
}

function getById(req: Request, res: Response, next: NextFunction): void {
    userService.getById(Number(req.params.id))
        .then(user => res.json(user))
        .catch(next);
}

function create(req: Request, res: Response, next: NextFunction): void {
    console.log("Received create request:", req.body);
    userService.create(req.body)
        .then(() => res.json({ message: "User created" }))
        .catch(next);
}

function update(req: Request, res: Response, next: NextFunction): void {
    userService.update(Number(req.params.id), req.body)
        .then(() => res.json({ message: "User updated" }))
        .catch(next);
}

function _delete(req: Request, res: Response, next: NextFunction): void {
    userService.delete(Number(req.params.id))
        .then(() => res.json({ message: "User deleted" }))
        .catch(next);
}

function createSchema(req: Request, res: Response, next: NextFunction): void {
    const schema = Joi.object({
        title: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        role: Joi.string().valid(Role.Admin, Role.User).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    });
    validateRequest(req, next, schema);
}

function updateSchema(req: Request, res: Response, next: NextFunction): void {
    const schema = Joi.object({
        title: Joi.string().optional(),
        firstName: Joi.string().optional(),
        lastName: Joi.string().optional(),
        role: Joi.string().valid(Role.Admin, Role.User).optional(),
        email: Joi.string().email().optional(),
        password: Joi.string().min(6).optional(),
    });
    validateRequest(req, next, schema);
}
