const { createWriteStream, createReadStream } = require('fs');

const originalFile = createReadStream('./textfile.txt');
const copyFile = createWriteStream('./copy-file.txt', {
    // we need wide hose
    highWaterMark: 1024 * 64
});

originalFile.on('data', (chunk) => {
    const more = copyFile.write(
       String(chunk).split('').reverse().join('')
    );

    if (!more) {
       console.log('The hose is full. Pause.');
       originalFile.pause();
    }
});

originalFile.on('error', console.error);

originalFile.on('end', () => copyFile.end());

copyFile.on('drain', () => {
    console.log('The hose is empty. Resume.');
    originalFile.resume();
});

copyFile.on('close', () => {
    process.stdout.write('You copied a textfile. 😈');
});