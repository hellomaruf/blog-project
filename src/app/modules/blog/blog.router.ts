import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { blogValidation } from "./blog.validation";
import { blogController } from "./blog.controller";
import { auth } from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/blogs",
  validateRequest(blogValidation.BlogSchema),
  //   auth("user"),
  blogController.createBlog
);
router.patch(
  "/blogs/:id",
  //   validateRequest(blogValidation.BlogSchema),
  auth("user"),
  blogController.updateBlog
);

export const BlogRouters = router;
