import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { userValidation } from "./auth.validation";

const router = express.Router();

router.post("/register", validateRequest(userValidation.userValidationSchema));

export const AuthRouters = router