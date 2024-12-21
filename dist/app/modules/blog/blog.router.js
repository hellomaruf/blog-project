"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRouters = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const blog_validation_1 = require("./blog.validation");
const blog_controller_1 = require("./blog.controller");
const auth_1 = require("../../middlewares/auth");
const router = express_1.default.Router();
router.post("/blogs", (0, validateRequest_1.default)(blog_validation_1.blogValidation.BlogSchema), 
//   auth("user"),
blog_controller_1.blogController.createBlog);
router.patch("/blogs/:id", (0, auth_1.auth)("user"), blog_controller_1.blogController.updateBlog);
router.delete("/blogs/:id", blog_controller_1.blogController.deleteBlog);
router.get("/blogs", blog_controller_1.blogController.getAllBlog);
router.delete("/blogs/:id", (0, auth_1.auth)("admin"), blog_controller_1.blogController.deleteBlog);
exports.BlogRouters = router;
