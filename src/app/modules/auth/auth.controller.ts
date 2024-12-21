import { RequestHandler } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { authServices } from "./auth.service";
import { TLoginUser, TUser } from "./auth.interface";
import jwt, { JwtPayload } from "jsonwebtoken";

const createRegisterUser: RequestHandler = catchAsync(
  async (req, res, next) => {
    const statusCode = 201;
    const { name, email, password } = req.body;
    const userRegisterData: TUser = {
      name,
      email,
      password,
      role: "user",
      isBlocked: false,
    };

    // will call service function to send this data------------->
    const result = await authServices.createRegisterUserIntoDB(
      userRegisterData
    );

    // send response ------------>
    res.status(statusCode).json({
      success: true,
      massage: "User registered successfully",
      statusCode: statusCode,
      data: {
        name: result.name,
        email: result.email,
        _id: result._id,
      },
    });
  }
);
const createLoginUser: RequestHandler = catchAsync(async (req, res, next) => {
  const statusCode = 200;
  const { email, password } = req.body;
  const userRegisterData: TLoginUser = {
    email,
    password,
  };

  // will call service function to send this data------------->
  const result = await authServices.createLoginUserIntoDB(userRegisterData);

  // send response ------------>
  res.status(statusCode).json({
    success: true,
    massage: "Login successful",
    statusCode: statusCode,
    data: {
      token: result?.token,
    },
  });
});

const blockUser: RequestHandler = catchAsync(async (req, res, next) => {
  const statusCode = 200;
  const { Id } = req.params;
  console.log("block user ", Id);

  await authServices.blockUserIntoDB(Id, {
    isBlocked: true,
  });

  res.status(statusCode).json({
    success: true,
    massage: "User blocked successfully",
    statusCode: statusCode,
  });
});


export const authController = {
  createRegisterUser,
  createLoginUser,
  blockUser,
 
};
