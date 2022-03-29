import { Request, Response, NextFunction } from 'express';
import { connection } from '../app/database/mysql';
import { PostModel } from './post.model';
import { createPosts, getPosts, updatePosts } from './post.service';

export const index = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // if (request.headers.authorization !== 'linweijian') {
  //   return next(new Error());
  // }

  try {
    const posts = await getPosts();
    response.send(posts);
  } catch (error) {
    next(error);
  }
};

export const store = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { title, content } = request.body;
  const { id: userId } = request.user;
  try {
    const data = await createPosts({ title, content, userId });
    response.status(201).send(data);
  } catch (error) {
    next(error);
  }
};

export const update = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { postId } = request.params;
  const { title, content } = request.body;

  try {
    const data = await updatePosts(parseInt(postId, 10), { title, content });
    response.send(data);
  } catch (error) {
    next(error);
  }
};
