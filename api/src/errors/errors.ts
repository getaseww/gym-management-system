import CustomError from "./customError";

export class BadRequestError extends Error{
    statusCode: number;
    errorCode: string;
  
    constructor(message: string) {
      super(message);
      this.statusCode = 400;
      this.errorCode = "Bad Request";
      this.name = this.constructor.name;
      Error.captureStackTrace(this, this.constructor);
    }
}