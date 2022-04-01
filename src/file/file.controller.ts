import { Request, Response, NextFunction } from 'express';
import _ from 'lodash';
import { createFile, findFileById } from './file.service';
/**
 * 上传文件
 */

export const store = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { id: userId } = request.user;
  const { post: postId } = request.query;
  const fileInfo = _.pick(request.file, [
    'originalname',
    'mimetype',
    'filename',
    'size',
  ]);
  console.log('userId type:', typeof userId);
  try {
    const data = await createFile({
      ...fileInfo,
      userId,
      postId: parseInt(postId[0]),
    });
    response.status(201).send(data);
  } catch (err) {
    next(err);
  }
};

export const serve = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { fileId } = request.params;

  try {
    const file = await findFileById(parseInt(fileId, 10));

    response.sendFile(file.filename, {
      root: 'uploads',
      headers: {
        'Content-Type': file.mimetype,
      },
    });
  } catch (err) {
    next(err);
  }
};
