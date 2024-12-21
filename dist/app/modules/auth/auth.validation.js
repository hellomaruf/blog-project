"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const userValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        email: zod_1.z.string(),
        password: zod_1.z.string().min(6, "Password must be at least 6 characters long"),
        role: zod_1.z.enum(["admin", "user"]).optional(),
        isBlocked: zod_1.z.boolean().optional(),
    }),
});
const loginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string(),
        password: zod_1.z.string().min(6, "Password must be at least 6 characters long"),
    }),
});
exports.userValidation = {
    userValidationSchema,
    loginValidationSchema,
};
