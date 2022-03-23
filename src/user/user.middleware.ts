import { Request, Response, NextFunction } from 'express';
import bcryptjs from 'bcryptjs';
import * as userService from './user.service';

/**
 * 验证用户数据
 */

export const validateUserData = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { name, password } = request.body;
  if (!name) return next(new Error('NAME_IS_REQUIRED'));
  if (!password) return next(new Error('PASSWORD_IS_REQUIRED'));

  try {
    const checkUserData = await userService.getUserByName(name);
    if (Array.isArray(checkUserData) && checkUserData.length > 0) {
      return next(new Error('USER_ALREADY_EXIST'));
    }
  } catch (err) {
    return next(err);
  }
  next();
};

export const hashPassword = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { password } = request.body;
  request.body.password = await bcryptjs.hash(password, 10);
  next();
};
