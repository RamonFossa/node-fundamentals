import http from 'node:http';
import { json } from './middlewares/json.js';
import { Database } from './database.js';

// Common HTTP Methods: GET, POST, PUT, PATCH, DELETE

// GET => Get some data from server;
// POST => Post new data to the server;
// PUT => Replace data to the server; (When needs to update a big piece of data)
// PATCH => Update data to the server; (When needs to update just once piece of data)
// DELETE => Delete data from server;

// Stateful - Stateless

// Headers req/res => MetaData

const database = new Database();

const server = http.createServer(async (req, res) => {
    const { url, method } = req;
    console.log('REQ => ', url, method);

    await json(req, res);

    if(url === '/' && method === 'GET') return res.writeHead(200).end('Hello, World!');

    if(url === '/users' && method === 'GET') return res.writeHead(200).end(JSON.stringify(database.select('users')));

    if(url === '/users' && method === 'POST') {
        const { name, email } = req.body;

        const user = {
            name,
            email,
        };
        database.insert('users', user);
        return res.writeHead(201).end('User created successfully!');
    }

    return res.writeHead(404).end();
});

server.listen(3333);