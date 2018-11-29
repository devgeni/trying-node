const { createServer } = require('http');
const { createReadStream, stat } = require('fs');
const { promisify } = require('util');

const fileInfo = promisify(stat);

const fileName = '../../video.mp4';

createServer(async (req, res) => {

    const { size } = await fileInfo(fileName);
    const range = req.headers.range;

    if (range) {
        let [start, end] = range.replace(/bytes=/, '').split('-');
        start = parseInt(start, 10);
        end = end ? parseInt(end, 10) : size - 1;

        // 206 http status code - Partial Content
        res.writeHead(206, {
            'Content-Range': `bytes ${start}-${end}/${size}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': (end - start) + 1,
            'Content-Type': 'video/mp4'
        });
        createReadStream(fileName, { start, end }).pipe(res);

    } else {
        res.writeHead(200, { 
            'Content-Length': size,
            'Content-Type': 'video/mp4' 
        });
        createReadStream(fileName).pipe(res);    
    }

}).listen(3000, () => console.log('The server is running - http://localhost:3000'));