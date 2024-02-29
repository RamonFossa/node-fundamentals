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

const server = http.createServer(async (req, res) => {
    const { url, method } = req;
    console.log('REQ => ', url, method);

    const buffers = [];

    for await (const chunk of req) {
        console.log(chunk);
        console.log(chunk.toString());
        buffers.push(chunk);
    }

    try {
        req.body = JSON.parse(Buffer.concat(buffers).toString());
    } catch {
        req.body = null;
    }

    console.log(req.body);

    if(url === '/' && method === 'GET') return res.writeHead(200).end('Hello, World!');

    if(url === '/users' && method === 'GET') return res.setHeader('Content-type', 'application/json').writeHead(200).end(JSON.stringify(users));

    if(url === '/users' && method === 'POST') {
        const { name, email } = req.body;

        users.push({
            name,
            email,
        });

        return res.writeHead(201).end('User created successfully!');
    }

    return res.writeHead(404).end();
});

server.listen(3333);