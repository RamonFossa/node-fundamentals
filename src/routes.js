import { randomUUID } from 'node:crypto';
import { Database } from './database.js';
import { buildRoutePath } from './utils/build-route-path.js';

const database = new Database();

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/users'),
        handler: (req, res) => {
            const { search } = req.query;

            return res.writeHead(200).end(JSON.stringify(database.select('users', search ? {
                name: search,
                email: search
            } : null)));
        },
    },
    {
        method: 'POST',
        path: buildRoutePath('/users'),
        handler: (req, res) => {
            const { name, email } = req.body;

            const user = {
                id: randomUUID(),
                name,
                email,
            };
        
            database.insert('users', user);
            return res.writeHead(201).end('User created successfully!');
        },
    },
    {
        method: 'PUT',
        path: buildRoutePath('/users/:id'),
        handler: (req, res) => {
            const { id } = req.params;
            const { email, name } = req.body;

            const databaseRes = database.update('users', id, {name, email});
            
            const { error, message } = databaseRes;

            return res.writeHead(error ? 404 : 200).end(message);
        },
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/users/:id'),
        handler: (req, res) => {
            const { id } = req.params;
            const databaseRes = database.delete('users', id);
            const { error, message } = databaseRes;

            return res.writeHead(error ? 404 : 200).end(message);
        },
    },
]