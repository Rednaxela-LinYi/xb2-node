import { Request, Response, NextFunction } from 'express';
import { UserModel } from './user.model';
import * as userService from './user.service';

export const store = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, password } = req.body;

  try {
    const data = await userService.createUser({ name, password });
    res.send(data);
  } catch (error) {
    next(error);
  }
};
