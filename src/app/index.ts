import express, { application } from 'express';
import postRouter from '../post/post.router';
import userRouter from '../user/user.router';
import { defaultErrorHandler } from './app.middleware';

const app = express();

app.use(express.json());

app.use(postRouter);
app.use(userRouter);
app.use(defaultErrorHandler);
export default app;
