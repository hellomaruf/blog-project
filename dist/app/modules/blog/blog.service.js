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
exports.blogService = void 0;
const queryBuilder_1 = __importDefault(require("../../builder/queryBuilder"));
const blog_constant_1 = require("./blog.constant");
const blog_model_1 = require("./blog.model");
const createBlogIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = blog_model_1.BlogModel.create(payload);
    return result;
});
const updateBlogIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updateBlogInfo = yield blog_model_1.BlogModel.findByIdAndUpdate(id, payload);
    return updateBlogInfo;
});
const deleteBlogFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.BlogModel.findByIdAndDelete(id);
    return result;
});
const getAllBlogFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const courseQuery = new queryBuilder_1.default(blog_model_1.BlogModel.find(), query)
        .search(blog_constant_1.blogSearchableFields)
        .filter()
        .sort();
    const result = yield courseQuery.modelQuery;
    return result;
});
const deleteBlogAdminFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteBlog = yield blog_model_1.BlogModel.findByIdAndDelete(id);
    return deleteBlog;
});
exports.blogService = {
    createBlogIntoDB,
    updateBlogIntoDB,
    deleteBlogFromDB,
    getAllBlogFromDB,
    deleteBlogAdminFromDB,
};
