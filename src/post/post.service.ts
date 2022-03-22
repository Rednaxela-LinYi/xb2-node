import { NextFunction } from 'express';
import { connection } from '../app/database/mysql';
import { PostModel } from './post.model';

export const getPosts = async () => {
  const statement = `
    SELECT
      post.id,
      post.title,
      post.content,
      user.name as author
    FROM post
    LEFT JOIN user
      ON user.id = post.userId
  `;

  const [data] = await connection.promise().query(statement);

  return data;
};

export const createPosts = async (post: PostModel) => {
  const statement = `
      insert into post
      set ?
    `;
  const [data] = await connection.promise().query(statement, post);
  return data;
};

export const updatePosts = async (postId: number, post: PostModel) => {
  const statement = `
    update post
    set ?
    where id = ?
  `;
  const [data] = await connection.promise().query(statement, [post, postId]);
  return data;
};
