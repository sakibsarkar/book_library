/* eslint-disable @typescript-eslint/no-unused-vars */

import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

import AppError from "../errors/AppError";
import handleZodError from "../errors/handleZodError";
import { IErrorSources } from "../interface/error";

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let message = "Something went wrong!";
  let statusCode = 500;
  let errorMessages: IErrorSources = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  if (error instanceof ZodError) {
    const simpleErr = handleZodError(error);
    statusCode = simpleErr?.statusCode;
    message = simpleErr?.message;
    errorMessages = simpleErr?.errorSources;
  } else if (error instanceof AppError) {
    statusCode = error?.statusCode;
    message = error.message;
    errorMessages = [];
  } else if (error instanceof Error) {
    message = error.message;
  }

  return res.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
    errorMessages: errorMessages.length > 0 ? errorMessages : undefined,
    stack: process.env.NODE_ENV === "development" ? error?.stack : undefined,
  });
};

export default globalErrorHandler;
