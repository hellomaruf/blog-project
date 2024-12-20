import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserModel } from "../modules/auth/auth.model";

const auth = (...requiredRole: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization;
      console.log(token?.split(' ')[1]);
      

    if (!token) {
      throw new Error("You are not Authorized!");
    }

    const decode = jwt.verify(token?.split(' ')[1], "secret") as JwtPayload;
    const { email, role } = decode;
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new Error("User not found!");
    }
    if (requiredRole && !requiredRole.includes(role)) {
      throw new Error("Your role not match so, You are not Authorized!");
    }
    next();
  });
};

export default auth;
