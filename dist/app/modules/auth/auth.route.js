"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouters = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_validation_1 = require("./auth.validation");
const auth_controller_1 = require("./auth.controller");
const auth_1 = require("../../middlewares/auth");
// import auth from "../../middlewares/auth";
const router = express_1.default.Router();
router.post("/register", (0, validateRequest_1.default)(auth_validation_1.userValidation.userValidationSchema), auth_controller_1.authController.createRegisterUser);
router.post("/login", (0, validateRequest_1.default)(auth_validation_1.userValidation.loginValidationSchema), auth_controller_1.authController.createLoginUser);
router.patch("/users/:Id/block", (0, auth_1.auth)("admin"), auth_controller_1.authController.blockUser);
// router.delete("/blogs/:id", auth("admin"), authController.deleteUser);
exports.AuthRouters = router;
