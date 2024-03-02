import http from 'node:http';
import { json } from './middlewares/json.js';
import { routes } from './routes.js';
import { extractQueryParams } from './utils/extract-query-params.js';

// Common HTTP Methods: GET, POST, PUT, PATCH, DELETE

// GET => Get some data from server;
// POST => Post new data to the server;
// PUT => Replace data to the server; (When needs to update a big piece of data)
// PATCH => Update data to the server; (When needs to update just once piece of data)
// DELETE => Delete data from server;

// Stateful - Stateless

// Headers req/res => MetaData

// UUID => Unique Universal ID

// Ways to receive parameters >>>>>>>>>>

// Query Parameters: URL Stateful => Filters, Paging
// http://localhost:3333/users?userId=1&name=Ramon

// Route Parameters:
// http://localhost:3333/users/1

// Request Body: Body for request, usually a JSON;


const server = http.createServer(async (req, res) => {
    const { url, method } = req;
    console.log('REQ => ', url, method);

    await json(req, res);

    const route = routes.find(route => route.method === method && route.path.test(url));

    if(route) {
        const routeParams = req.url.match(route.path);

        const { query, ... params } = routeParams.groups;

        req.params = params;
        req.query = query ? extractQueryParams(query) : {};

        return route.handler(req, res);
    }

    return res.writeHead(404).end();
});

server.listen(3333);