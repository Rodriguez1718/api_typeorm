import { Request, NextFunction } from "express";
import Joi from "joi";

export function validateRequest(req: Request, next: NextFunction, schema: Joi.ObjectSchema) {
    const options = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true,
    };
    const { error, value } = schema.validate(req.body, options);
    if (error) {
        console.error("Validation error:", error.details);
        next(`Validation error: ${error.details.map(x => x.message).join(", ")}`);
    } else {
        req.body = value;
        next();
    }
}
