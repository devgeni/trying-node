const { PassThrough } = require('stream');
const { createReadStream, createWriteStream } = require('fs');

const source = createReadStream('./textfile.txt');
const destination = createWriteStream('./copyfile.txt');

const charCounter = new PassThrough();

const countChars = (text) => {
    const cache = {};
    const chars = text.split('');

    chars.forEach(char => {
        if (cache[char]) {
            cache[char] += 1;
        } else {
            cache[char] = 1;
        }
    });

    return Object.entries(cache).sort((a, b) => b[1] - a[1])
        .reduce((obj, [key, val]) => ({
            ...obj,
            [key]: val
        }), {});
};

charCounter.on('data', chunk => {
    const data = countChars(String(chunk));
    console.log(data);
});

source.pipe(charCounter).pipe(destination);