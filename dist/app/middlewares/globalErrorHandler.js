"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const handleZodError_1 = __importDefault(require("../error/handleZodError"));
const handleValidationError_1 = __importDefault(require("../error/handleValidationError"));
const globalErrorHandler = (err, req, res, next) => {
    // Default error start---------->
    let statusCode = err.statusCode || 500;
    let message = err.message || "Something Went Wrong!";
    let errorSourse = [
        {
            path: "",
            message: "Something Went Wrong!",
        },
    ];
    // Default error end---------->
    if (err instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZodError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSourse = simplifiedError.errorSourse;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === "ValidationError") {
        const simplifiedError = (0, handleValidationError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSourse = simplifiedError.errorSourse;
    }
    // handle zod error end ----------->
    console.error(err);
    res.status(statusCode || 500).json({
        success: false,
        message,
        errorSourse,
        err,
        stack: process.env.NODE_ENV === "development" ? err === null || err === void 0 ? void 0 : err.stack : null,
    });
};
exports.default = globalErrorHandler;
