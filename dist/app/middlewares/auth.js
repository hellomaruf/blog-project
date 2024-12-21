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
exports.auth = void 0;
const catchAsync_1 = require("../utils/catchAsync");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_model_1 = require("../modules/auth/auth.model");
const auth = (...requiredRole) => {
    return (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers.authorization;
        if (!token) {
            throw new Error("You are not Authorized!");
        }
        const decode = jsonwebtoken_1.default.verify(token === null || token === void 0 ? void 0 : token.split(" ")[1], "secret");
        console.log("decode -------->", decode);
        const { email, role, name } = decode;
        console.log(name);
        const user = yield auth_model_1.UserModel.findOne({ email });
        if (!user) {
            throw new Error("User not found!");
        }
        console.log(requiredRole, role);
        if (requiredRole && !requiredRole.includes(role)) {
            throw new Error("Your role not match so, You are not Authorized!");
        }
        next();
    }));
};
exports.auth = auth;
