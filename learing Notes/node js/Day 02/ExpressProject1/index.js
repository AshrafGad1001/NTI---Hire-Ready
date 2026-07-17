const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./Routes/userRoutes');



const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/ExpressProject1')
    .then(() => console.log('DB Connection Successful!'))
    .catch((err) => console.error('DB Connection Error:', err));


app.use('/api/users', userRoutes);


app.all('/{*splat}', (req, res, next) => {
    const error = new Error(`Can't find ${req.originalUrl} on this server!`);
    error.statusCode = 404;
    next(error);
});

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        stack: err.stack
    });
});


app.listen(5000, () => {
    console.log("Server is running on port: 5000");
});