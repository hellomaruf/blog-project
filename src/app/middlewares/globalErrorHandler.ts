import { ErrorRequestHandler } from "express";
import { TErrorSourse } from "../interface/error";
import { ZodError } from "zod";
import handleZodError from "../error/handleZodError";
import handleValidationError from "../error/handleValidationError";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    // Default error start---------->
    let statusCode = err.statusCode || 500;
    let message = err.message || "Something Went Wrong!";
  
    let errorSourse: TErrorSourse = [
      {
        path: "",
        message: "Something Went Wrong!",
      },
    ];
    // Default error end---------->
  
    if (err instanceof ZodError) {
      const simplifiedError = handleZodError(err);
      statusCode = simplifiedError.statusCode;
      message = simplifiedError.message;
      errorSourse = simplifiedError.errorSourse;
    } else if (err?.name === "ValidationError") {
      const simplifiedError = handleValidationError(err);
      statusCode = simplifiedError.statusCode;
      message = simplifiedError.message;
      errorSourse = simplifiedError.errorSourse;
    }
    // handle zod error end ----------->
  
    console.error(err);
  
    res.status(statusCode || 500).json({
      success: false,
      message,
      errorSourse,
      err,
      stack: process.env.NODE_ENV === "development" ? err?.stack : null,
    });
  };
  export default globalErrorHandler;