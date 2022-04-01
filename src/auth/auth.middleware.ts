import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import * as userService from '../user/user.service';
import { PUBLIC_KEY } from '../app/app.config';
import { TokenPayload } from './auth.interface';
import { possess } from './auth.service';

export const validateLoginData = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { name, password } = request.body;
  if (!name) return next(new Error('NAME_IS_REQUIRED'));
  if (!password) return next(new Error('PASSWORD_IS_REQUIRED'));

  try {
    const checkUserData = await userService.getUserByName(name, {
      password: true,
    });

    console.log(password, checkUserData[0]['password']);
    if (Array.isArray(checkUserData) && checkUserData.length === 1) {
      const match = await bcryptjs.compare(
        password.toString(),
        checkUserData[0]['password']
      );
      console.log(checkUserData[0], checkUserData[0]['password']);
      if (!match) {
        return next(new Error('PASSWORD_DOES_NOT_MATCH'));
      } else {
        request.body.user = checkUserData;
        console.log(request.body);
      }
    } else {
      return next(new Error('USER_DOES_NOT_EXIST'));
    }
  } catch (err) {
    console.log('此路不通', err.message);
    return next(err);
  }

  next();
};

export const authGuard = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const authorization = request.header('Authorization');
    if (!authorization) {
      throw new Error();
    }
    const token = authorization.replace('Bearer ', '');
    if (!token) {
      throw new Error();
    }
    //验证令牌 这里如何验证public key和private key之间是否有关联?
    const decode = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256'],
    });

    //在请求中添加当前用户
    request.user = decode as TokenPayload;
    next();
  } catch (err) {
    next(new Error('UNAUTHORIZED'));
  }
};

interface AccessControlOptions {
  possession?: boolean;
}

export const accessControl = (options: AccessControlOptions) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    console.log('访问控制');
    const { possession } = options;

    const { id: userId } = request.user;

    if (userId === 1) {
      return next();
    }

    console.log('request.params', request.params); //like {postId:1}
    const resourceIdParam = Object.keys(request.params)[0];
    const resourceType = resourceIdParam.replace('Id', '');
    const resourceId = parseInt(request.params[resourceIdParam], 10);

    if (possession) {
      console.log(resourceId, resourceType, userId);
      try {
        const ownResource = await possess({ resourceId, resourceType, userId });
        if (!ownResource) {
          return next(new Error('USER_DOES_NOT_OWN_RESOURCE'));
        } else {
        }
      } catch (err) {}
    }
  };
};
