import { RequestHandler } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { registerServices } from "./auth.service";
import { TUser } from "./auth.interface";

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
    const result = await registerServices.createRegisterUserIntoDB(
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
        _id: result._id
      },
    });
  }
);

export const authController = {
  createRegisterUser,
};
