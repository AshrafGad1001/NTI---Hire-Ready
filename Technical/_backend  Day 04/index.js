import express from 'express';
import DBConnection from './src/DB/connection.js';
import userRouter from './src/Modules/user/user.router.js';
import postRouter from './src/Modules/post/post.router.js';
import { getUserPosts } from './src/Modules/post/post.controller.js';

const app = express();
app.use(express.json());

DBConnection();

app.use('/users', userRouter);
app.use('/posts', postRouter);
app.get('/users/:id/posts', getUserPosts);

app.listen(3000, () => {
    console.log('Server is Running on http://localhost:3000');
});