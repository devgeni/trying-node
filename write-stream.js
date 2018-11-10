const { createWriteStream, createReadStream } = require('fs');

const originalFile = createReadStream('./textfile.txt');
const copyFile = createWriteStream('./copy-file.txt');

originalFile.on('data', (chunk) => {
    copyFile.write(String(chunk).split('').reverse().join(''));
});

originalFile.on('error', console.error);

originalFile.on('end', () => copyFile.end());

copyFile.on('close', () => {
    process.stdout.write('You copied a textfile. 😈');
});