const fs = require('fs');

const videoStream = fs.createReadStream('./textfile.txt', {
    highWaterMark: 1024
});

videoStream.on('data', (chunk) => {
    console.log(`${chunk}`);
});

videoStream.on('end', () => {
    console.log('Streaming ended.')
    process.exit();
});
videoStream.on('error', console.error);

videoStream.pause();

process.stdin.on('data', (chunk) => {
    const text = String(chunk).trim();
    
    switch (text) {
        case 'exit':
            process.exit(1);
            break;
        case 'flow':
            videoStream.resume();
            break;
        default:
            videoStream.read();
            break;
    }

});