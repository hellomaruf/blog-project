import { TUser } from "./auth.interface";
import { UserModel } from "./auth.model";

const createRegisterUserIntoDB = async (payload: TUser) => {
  const result = UserModel.create(payload);
  return result;
};

export const registerServices = {
  createRegisterUserIntoDB,
};
