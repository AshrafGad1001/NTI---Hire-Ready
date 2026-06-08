import express from 'express';
import connectDB from './src/DB/connection.js';

const app = express();
app.use(express.json());

connectDB();

app.listen(3000, () => {
    console.log('Server is Running on http://localhost:3000');
});