import http from 'node:http';

// Common HTTP Methods: GET, POST, PUT, PATCH, DELETE

// GET => Get some data from server;
// POST => Post new data to the server;
// PUT => Replace data to the server; (When needs to update a big piece of data)
// PATCH => Update data to the server; (When needs to update just once piece of data)
// DELETE => Delete data from server;

const server = http.createServer((req, res) => {
    const { url, method } = req;

    if(url === '/' && method === 'GET') return res.end('Hello, World!');

    if(url === '/users' && method === 'GET') return res.end('Users List!');

    if(url === '/users' && method === 'POST') return res.end('Create User!');

    return res.end('Not Found!');
});

server.listen(3333);