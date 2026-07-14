const express = require('express');
const app = express();






app.get('/', (req, res) => {
    res.send("Hello, First Appp With Express!");
});


app.get('/about', (req, res) => {
    res.send("<h1>This is the About Page!</h1>");
});


app.listen(5000, () => {
    console.log("Server is running on port: 5000");
});