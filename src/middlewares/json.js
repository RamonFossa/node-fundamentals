export async function json(req, res) {
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

    res.setHeader('Content-type', 'application/json');
} // middlewares are interceptors and generally they receive req and res;