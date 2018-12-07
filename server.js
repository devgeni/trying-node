const http = require('http');
const url = require('url');
const { StringDecoder } = require('string_decoder');

const server = http.createServer((req, res) => {
    const { pathname, query } = url.parse(req.url, true);

    const { method, headers } = req;

    const decoder = new StringDecoder('utf-8');

    let buffer = '';
    req.on('data', (data) => {
        buffer += decoder.write(data);
    });

    req.on('end', () => {
        buffer += decoder.end();

        res.end(buffer);
    });

});

server.listen(80, () => console.log('Server is http://localhost'));