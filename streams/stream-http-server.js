import http from 'node:http';
import { Transform } from 'node:stream';

class InverseNumberSteam extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1;
        const buf =  Buffer.from(String(transformed));
        console.log(transformed);
        callback(null, buf);
    }
}

const server = http.createServer(async (req, res) => {
    const buffers = [];

    for await (const chunk of req) {
        console.log(chunk);
        console.log(chunk.toString());
        buffers.push(chunk);
    }

    const fullStreamContent = Buffer.concat(buffers).toString();

    console.log(fullStreamContent);

    return res.end(fullStreamContent);
});

server.listen(3334);