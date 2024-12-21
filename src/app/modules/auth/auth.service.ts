import { TLoginUser, TUser } from "./auth.interface";
import { UserModel } from "./auth.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createRegisterUserIntoDB = async (payload: TUser) => {
  const isExist = await UserModel.findOne({ email: payload?.email });
  if (isExist) {
    throw new Error("This user already Exist!");
  }
  const result = await UserModel.create(payload);
  return result;
};

const createLoginUserIntoDB = async (payload: TLoginUser) => {
  const user = await UserModel.findOne({ email: payload?.email });
  const isBlocked = user?.isBlocked;
  if (!user) {
    throw new Error("User not found!");
  }

  if (isBlocked === true) {
    throw new Error("This User is Blocked!");
  }

  const isPasswordMatch = await bcrypt.compare(
    payload?.password,
    user?.password
  );

  if (!isPasswordMatch) {
    throw new Error("Password is not Match!");
  }

  const token = jwt.sign(
    {
      _id: user?._id,
      name: user?.name,
      email: user?.email,
      role: user?.role,
      isBlocked: user?.isBlocked,
    },
    "secret",
    {
      expiresIn: "30d",
    }
  );

  return {
    token,
    user,
  };
};

const blockUserIntoDB = async (id: string, payload: Partial<TUser>) => {
  console.log(payload);
  
  const blockInfo = await UserModel.findByIdAndUpdate(id, payload);
  return blockInfo;
};

export const authServices = {
  createRegisterUserIntoDB,
  createLoginUserIntoDB,blockUserIntoDB
};
