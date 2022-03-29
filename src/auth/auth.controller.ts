import { Request, Response, NextFunction } from 'express';
import * as userService from '../user/user.service';
import { signToken } from './auth.service';

export const login = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  //未做签发令牌功能前
  // const { name, password } = request.body;
  // response.send({
  //   message: `欢迎回来，${name}`,
  // });

  //做签发令牌功能后
  const { user } = request.body;

  const payload = {
    id: user[0].id,
    name: user[0].name,
  };

  try {
    const token = signToken({ payload });
    response.send({
      id: user[0].id,
      name: user[0].name,
      token: token,
    });
  } catch (error) {
    next(error);
  }
};

export const validate = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log(request.user);
  response.sendStatus(200);
};
