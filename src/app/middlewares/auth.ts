import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserModel } from "../modules/auth/auth.model";

export const auth = (...requiredRole: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    

    if (!token) {
      throw new Error("You are not Authorized!");
    }

    const decode = jwt.verify(token?.split(" ")[1], "secret") as JwtPayload;
    console.log("decode -------->", decode);

    

    const { email, role, name } = decode;
    console.log(name);
    
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new Error("User not found!");
    }
    console.log(requiredRole, role);
    

    if (requiredRole && !requiredRole.includes(role)) {
      throw new Error("Your role not match so, You are not Authorized!");
    }
    
    next();
  });
};

