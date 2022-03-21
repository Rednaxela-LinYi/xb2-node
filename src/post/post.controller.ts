import { Request, Response, NextFunction } from 'express';

export const index = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (request.headers.authorization !== 'linweijian') {
    return next(new Error());
  }
  response.send('内容接口列表');
};
