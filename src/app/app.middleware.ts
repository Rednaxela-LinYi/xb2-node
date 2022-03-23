import { Request, Response, NextFunction } from 'express';

export const requestUrl = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log(request.url);
  next();
};

export const defaultErrorHandler = (
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // let responseStatusCode, responseMessage;
  // responseStatusCode = 500;
  // responseMessage = '服务器内部错误';
  // console.log(responseMessage);
  //
  if (error.message) {
    console.log(error.message);
  }

  response.send(response);
};
