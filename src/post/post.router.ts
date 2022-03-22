import express from 'express';
import * as postController from './post.controller';
import { requestUrl } from '../app/app.middleware';

const router = express.Router();

router.get('/posts', requestUrl, postController.index);
router.post('/posts', postController.store);
router.post('/posts/:postId', postController.update);

export default router;
