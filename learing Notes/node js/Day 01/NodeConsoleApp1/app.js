const http = require('node:http');

const server = http.createServer((req, res) => {


    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>Welcome to our Simple API!</h1>');
    }
    else if (req.url === '/api/users' && req.method === 'GET') {

        const users = [
            { id: 1, name: 'Ahmed', role: 'Admin' },
            { id: 2, name: 'Sara', role: 'User' },
            { id: 3, name: 'Omar', role: 'User' }
        ];

        
              res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        
        res.end(JSON.stringify(users));
    }
    else {
        res.statusCode = 404;
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>404 - Page Not Found</h1>');
    }

});

server.listen(5000, () => {
    console.log('Server is running..');
    console.log('Homepage: http://localhost:5000');
    console.log('API Test: http://localhost:5000/api/users');
});