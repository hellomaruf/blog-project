"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const auth_service_1 = require("./auth.service");
const createRegisterUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const statusCode = 201;
    const { name, email, password } = req.body;
    const userRegisterData = {
        name,
        email,
        password,
        role: "user",
        isBlocked: false,
    };
    // will call service function to send this data------------->
    const result = yield auth_service_1.authServices.createRegisterUserIntoDB(userRegisterData);
    // send response ------------>
    res.status(statusCode).json({
        success: true,
        massage: "User registered successfully",
        statusCode: statusCode,
        data: {
            name: result.name,
            email: result.email,
            _id: result._id,
        },
    });
}));
const createLoginUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const statusCode = 200;
    const { email, password } = req.body;
    const userRegisterData = {
        email,
        password,
    };
    // will call service function to send this data------------->
    const result = yield auth_service_1.authServices.createLoginUserIntoDB(userRegisterData);
    // send response ------------>
    res.status(statusCode).json({
        success: true,
        massage: "Login successful",
        statusCode: statusCode,
        data: {
            token: result === null || result === void 0 ? void 0 : result.token,
        },
    });
}));
const blockUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const statusCode = 200;
    const { Id } = req.params;
    console.log("block user ", Id);
    yield auth_service_1.authServices.blockUserIntoDB(Id, {
        isBlocked: true,
    });
    res.status(statusCode).json({
        success: true,
        massage: "User blocked successfully",
        statusCode: statusCode,
    });
}));
exports.authController = {
    createRegisterUser,
    createLoginUser,
    blockUser,
};
