import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "./catchAsync";

export const author = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new Error("You are not Authorized!");
    }

    const decode = jwt.verify(token?.split(" ")[1], "secret") as JwtPayload;
    console.log(decode);

    next();
  });
};
