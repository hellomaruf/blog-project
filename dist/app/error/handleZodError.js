"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// handle zod error start ----------->
const handleZodError = (err) => {
    const statusCode = 400;
    const errorSourse = err.issues.map((issue) => {
        return {
            path: issue === null || issue === void 0 ? void 0 : issue.path[issue.path.length - 1],
            message: issue.message,
        };
    });
    return {
        statusCode,
        message: "Zod Validaiton Error!",
        errorSourse,
    };
};
exports.default = handleZodError;
