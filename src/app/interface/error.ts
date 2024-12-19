export type TErrorSourse = {
    path: string | number;
    message: string;
}[];
  
export type TGenericError = {
  statusCode: number,
  message: string,
  errorSourse : TErrorSourse
}