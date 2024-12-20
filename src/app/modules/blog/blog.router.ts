import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { blogValidation } from "./blog.validation";
import { blogController } from "./blog.controller";

const router = express.Router();

router.post(
  "/blogs",
  validateRequest(blogValidation.BlogSchema),
  blogController.createBlog  
);



export const BlogRouters = router;
