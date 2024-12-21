import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { userValidation } from "./auth.validation";
import { authController } from "./auth.controller";
import { auth } from "../../middlewares/auth";
// import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/register",
  validateRequest(userValidation.userValidationSchema),
  authController.createRegisterUser
);

router.post(
  "/login",
  validateRequest(userValidation.loginValidationSchema),
  authController.createLoginUser
);
router.patch("/users/:Id/block", auth("admin"), authController.blockUser);
// router.delete("/blogs/:id", auth("admin"), authController.deleteUser);

export const AuthRouters = router;
