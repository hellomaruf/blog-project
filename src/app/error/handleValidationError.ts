import mongoose from "mongoose";
import { TErrorSourse, TGenericError } from "../interface/error";

const handleValidationError  = (err: mongoose.Error.ValidationError) : TGenericError => {
    const statusCode = 400;
  
    const errorSourse: TErrorSourse = Object.values(err.errors).map(
      (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
        return {
          path: val?.path,
          message: val?.message,
        };
      }
    );
  
    return {
      statusCode,
      message: "Validaiton Error!",
      errorSourse,
    };
  };
  
  export default handleValidationError;