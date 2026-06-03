
// function printName() {
//     console.log("Ashraf Alaa Gad");
// }
// printName();






const http = require('http');

const server = http.createServer((req, res) => {

    if (req.url === '/' && req.method === 'GET') {
        console.log("Home Page");
    }
    else if (req.url === '/about' && req.method === 'GET') {
        console.log("About Page");
    }
    else if (req.url === '/contact' && req.method === 'GET') {
        console.log("Contact Page");
    }
    else {
        console.log("Page Not Found");
    }

}).listen(3000, () => {
    console.log("Server is Running ");
});