"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_service_1 = require("../services/user.service");
const validate_request_1 = require("../middlewares/validate-request");
const joi_1 = __importDefault(require("joi"));
const role_1 = require("../utils/role");
const usersRouter = (0, express_1.Router)();
usersRouter.get("/", getAll);
usersRouter.get("/:id", getById);
usersRouter.post("/", createSchema, create);
usersRouter.put("/:id", updateSchema, update);
usersRouter.delete("/:id", _delete);
exports.default = usersRouter; // ✅ Export the router
function getAll(req, res, next) {
    user_service_1.userService.getAll()
        .then(users => res.json(users))
        .catch(next);
}
function getById(req, res, next) {
    user_service_1.userService.getById(Number(req.params.id))
        .then(user => res.json(user))
        .catch(next);
}
function create(req, res, next) {
    user_service_1.userService.create(req.body)
        .then(() => res.json({ message: "User created" }))
        .catch(next);
}
function update(req, res, next) {
    user_service_1.userService.update(Number(req.params.id), req.body)
        .then(() => res.json({ message: "User updated" }))
        .catch(next);
}
function _delete(req, res, next) {
    user_service_1.userService.delete(Number(req.params.id))
        .then(() => res.json({ message: "User deleted" }))
        .catch(next);
}
function createSchema(req, res, next) {
    const schema = joi_1.default.object({
        title: joi_1.default.string().required(),
        firstName: joi_1.default.string().required(),
        lastName: joi_1.default.string().required(),
        role: joi_1.default.string().valid(role_1.Role.Admin, role_1.Role.User).required(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(6).required(),
    });
    (0, validate_request_1.validateRequest)(req, next, schema);
}
function updateSchema(req, res, next) {
    const schema = joi_1.default.object({
        title: joi_1.default.string().optional(),
        firstName: joi_1.default.string().optional(),
        lastName: joi_1.default.string().optional(),
        role: joi_1.default.string().valid(role_1.Role.Admin, role_1.Role.User).optional(),
        email: joi_1.default.string().email().optional(),
        password: joi_1.default.string().min(6).optional(),
    });
    (0, validate_request_1.validateRequest)(req, next, schema);
}
