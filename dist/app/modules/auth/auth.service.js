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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServices = void 0;
const auth_model_1 = require("./auth.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createRegisterUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield auth_model_1.UserModel.findOne({ email: payload === null || payload === void 0 ? void 0 : payload.email });
    if (isExist) {
        throw new Error("This user already Exist!");
    }
    const result = yield auth_model_1.UserModel.create(payload);
    return result;
});
const createLoginUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_model_1.UserModel.findOne({ email: payload === null || payload === void 0 ? void 0 : payload.email });
    const isBlocked = user === null || user === void 0 ? void 0 : user.isBlocked;
    if (!user) {
        throw new Error("User not found!");
    }
    if (isBlocked === true) {
        throw new Error("This User is Blocked!");
    }
    const isPasswordMatch = yield bcrypt_1.default.compare(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password);
    if (!isPasswordMatch) {
        throw new Error("Password is not Match!");
    }
    const token = jsonwebtoken_1.default.sign({
        _id: user === null || user === void 0 ? void 0 : user._id,
        name: user === null || user === void 0 ? void 0 : user.name,
        email: user === null || user === void 0 ? void 0 : user.email,
        role: user === null || user === void 0 ? void 0 : user.role,
        isBlocked: user === null || user === void 0 ? void 0 : user.isBlocked,
    }, "secret", {
        expiresIn: "30d",
    });
    return {
        token,
        user,
    };
});
const blockUserIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload);
    const blockInfo = yield auth_model_1.UserModel.findByIdAndUpdate(id, payload);
    return blockInfo;
});
exports.authServices = {
    createRegisterUserIntoDB,
    createLoginUserIntoDB,
    blockUserIntoDB,
};
