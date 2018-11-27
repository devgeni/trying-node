const { createServer } = require('http');
const { createReadStream, stat } = require('fs');
const { promisify } = require('util');

const fileInfo = promisify(stat);

const fileName = '../../video.mp4';

createServer(async (req, res) => {

    const { size } = await fileInfo(fileName);
    
    res.writeHead(200, { 
        'Content-Length': size,
        'Content-Type': 'video/mp4' 
    });
    createReadStream(fileName).pipe(res);
    
}).listen(3000, () => console.log('The server is running - http://localhost:3000'));