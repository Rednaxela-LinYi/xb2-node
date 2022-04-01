import { Request, Response, NextFunction } from 'express';
import multer from 'multer';

const fileUpload = multer({
  dest: 'uploads/',
});

//通过file路由上传文件的字段名为file
export const fileInterceptor = fileUpload.single('file');
