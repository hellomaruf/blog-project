import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { userValidation } from "./auth.validation";
import { authController } from "./auth.controller";

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

export const AuthRouters = router;
