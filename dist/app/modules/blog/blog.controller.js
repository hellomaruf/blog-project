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
exports.blogController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const blog_service_1 = require("./blog.service");
const createBlog = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const statusCode = 201;
    const { title, content } = req.body;
    const token = req.headers.authorization;
    console.log(token);
    if (!token) {
        throw new Error("You are not Authorized!");
    }
    const author = jsonwebtoken_1.default.verify(token === null || token === void 0 ? void 0 : token.split(" ")[1], "secret");
    const blogData = {
        title,
        content,
        author,
        isPublished: true,
    };
    const result = yield blog_service_1.blogService.createBlogIntoDB(blogData);
    // send response ------------>
    res.status(statusCode).json({
        success: true,
        massage: "Blog created successfully",
        statusCode: statusCode,
        data: {
            _id: result._id,
            title: result.title,
            content: result.content,
            author: author,
        },
    });
}));
const updateBlog = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const statusCode = 200;
    const { id } = req.params;
    const token = req.headers.authorization;
    console.log(token);
    if (!token) {
        throw new Error("You are not Authorized!");
    }
    const author = jsonwebtoken_1.default.verify(token === null || token === void 0 ? void 0 : token.split(" ")[1], "secret");
    const { title, content } = req.body;
    const result = yield blog_service_1.blogService.updateBlogIntoDB(id, req.body);
    res.status(statusCode).json({
        success: true,
        massage: "Blog updated successfully",
        statusCode: statusCode,
        data: {
            _id: result === null || result === void 0 ? void 0 : result._id,
            title,
            content,
            author,
        },
    });
}));
const deleteBlog = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const statusCode = 200;
    const { id } = req.params;
    yield blog_service_1.blogService.deleteBlogFromDB(id);
    res.status(statusCode).json({
        success: true,
        massage: "Blog deleted successfully",
        statusCode: statusCode,
    });
}));
const getAllBlog = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const statusCode = 200;
    const result = yield blog_service_1.blogService.getAllBlogFromDB(req.query);
    res.status(statusCode).json({
        success: true,
        massage: "Blogs fetched successfully",
        statusCode,
        data: result,
    });
}));
const deleteBlogAdmin = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const statusCode = 200;
    const { id } = req.params;
    const token = req.headers;
    console.log(token);
    if (!token) {
        throw new Error("You are not Authorized!");
    }
    // const author = jwt.verify(token?.split(" ")[1], "secret") as JwtPayload;
    // console.log(author);
    yield blog_service_1.blogService.deleteBlogAdminFromDB(id);
    res.status(statusCode).json({
        success: true,
        massage: "Blog deleted successfully",
        statusCode: statusCode,
    });
}));
exports.blogController = {
    createBlog,
    updateBlog,
    deleteBlog,
    getAllBlog,
    deleteBlogAdmin,
};
