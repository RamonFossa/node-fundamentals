import http from 'node:http';

// Common HTTP Methods: GET, POST, PUT, PATCH, DELETE

// GET => Get some data from server;
// POST => Post new data to the server;
// PUT => Replace data to the server; (When needs to update a big piece of data)
// PATCH => Update data to the server; (When needs to update just once piece of data)
// DELETE => Delete data from server;

// Stateful - Stateless

// Headers req/res => MetaData

const users = [];

const server = http.createServer((req, res) => {
    const { url, method } = req;

    if(url === '/' && method === 'GET') return res.writeHead(200).end('Hello, World!');

    if(url === '/users' && method === 'GET') return res.writeHead(200).setHeader('Content-type', 'application/json').end(JSON.stringify(users));

    if(url === '/users' && method === 'POST') {
        users.push({
            id: 1,
            name: 'John Doe',
            email: 'johndoe@example.com',
        })

        return res.writeHead(201).end();
    }

    return res.writeHead(404).end();
});

server.listen(3333);