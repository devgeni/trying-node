const { createServer } = require('http');
const { createWriteStream } = require('fs');
const { parse } = require('url');

createServer((req, res) => {

    const { pathname, query } = parse(req.url, true);
    console.log(pathname, query);

    const headers = req.headers;
    console.log('these are headers:', headers);

    if (req.method === 'POST') {
        req.pipe(res);
        req.pipe(createWriteStream('./uploaded-file.noext'))
    } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <form method="POST"
                action="/" enctype="multipart/form-data">
                <input type="file" name="file_upload" />
                <button type="submit">Upload file</button>
            </form>
        `);
    }

}).listen(80, () => console.log('server is http://localhost'));