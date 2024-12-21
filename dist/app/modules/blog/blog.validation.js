"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogValidation = void 0;
const zod_1 = require("zod");
const BlogSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string(),
        content: zod_1.z.string(),
        author: zod_1.z.string().optional(),
        isPublished: zod_1.z.boolean().default(true),
    }),
});
exports.blogValidation = {
    BlogSchema,
};