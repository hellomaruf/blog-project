import { NextFunction, Request, RequestHandler, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { TBlog } from "./blog.interface";
import jwt, { JwtPayload } from "jsonwebtoken";
import { blogService } from "./blog.service";
import { author } from "../../utils/author";

const createBlog: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const statusCode = 201;
    const { title, content } = req.body;

    const token = req.headers.authorization;
    console.log(token);

    if (!token) {
      throw new Error("You are not Authorized!");
    }
    const author = jwt.verify(token?.split(" ")[1], "secret") as JwtPayload;

    const blogData: TBlog = {
      title,
      content,
      author,
      isPublished: true,
    };

    const result = await blogService.createBlogIntoDB(blogData);

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
  }
);

const updateBlog: RequestHandler = catchAsync(async (req, res, next) => {
  const statusCode = 200;
  const { id } = req.params;
  const token = req.headers.authorization;
  console.log(token);

  if (!token) {
    throw new Error("You are not Authorized!");
  }
  const author = jwt.verify(token?.split(" ")[1], "secret") as JwtPayload;

  const { title, content } = req.body;

  const result = await blogService.updateBlogIntoDB(id, req.body);

  res.status(statusCode).json({
    success: true,
    massage: "Blog updated successfully",
    statusCode: statusCode,
    data: {
      _id: result?._id,
      title,
      content,
      author,
    },
  });
});

const deleteBlog: RequestHandler = catchAsync(async (req, res, next) => {
  const statusCode = 200;
  const { id } = req.params;

  await blogService.deleteBlogFromDB(id);

  res.status(statusCode).json({
    success: true,
    massage: "Blog deleted successfully",
    statusCode: statusCode,
  });
});
const getAllBlog: RequestHandler = catchAsync(async (req, res, next) => {
  const statusCode = 200;
  const result = await blogService.getAllBlogFromDB(req.query);

  res.status(statusCode).json({
    success: true,
    massage: "Blogs fetched successfully",
    statusCode,
    data: result,
  });
});

const deleteBlogAdmin: RequestHandler = catchAsync(async (req, res, next) => {
  const statusCode = 200;
  const { id } = req.params;
  console.log("block user ", id);

  await blogService.deleteBlogAdminFromDB(id);

  res.status(statusCode).json({
    success: true,
    massage: "Blog deleted successfully",
    statusCode: statusCode,
  });
});


export const blogController = {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlog,
  deleteBlogAdmin,
};
