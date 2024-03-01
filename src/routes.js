import { randomUUID } from 'node:crypto';
import { Database } from './database.js';
import { buildRoutePath } from './utils/build-route-path.js';

const database = new Database();

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/users'),
        handler: (req, res) => {
            return res.writeHead(200).end(JSON.stringify(database.select('users')));
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
        method: 'DELETE',
        path: buildRoutePath('/users/:id/Nha/:o'),
        handler: (req, res) => {
            return res.end('DELETOU');
        },
    },
]