import { ZodError, ZodIssue } from "zod";
import { TGenericError } from "../interface/error";

// handle zod error start ----------->
const handleZodError = (err: ZodError): TGenericError => {
    const statusCode = 400;
    const errorSourse = err.issues.map((issue: ZodIssue) => {
      return {
        path: issue?.path[issue.path.length - 1],
        message: issue.message,
      };
    });
    return {
      statusCode,
      message: "Zod Validaiton Error!",
      errorSourse,
    };
  };
  
  export default handleZodError;