import express from 'express';
import DBConnection from './src/DB/connection.js';
import userRouter from './src/Modules/user/user.router.js';
import postRouter from './src/Modules/post/post.router.js';

const app = express();
app.use(express.json());

DBConnection();

app.use('/users', userRouter);
app.use('/posts', postRouter);

app.listen(3000, () => {
    console.log('Server is Running..............');
});