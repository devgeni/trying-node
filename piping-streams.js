const { createWriteStream, createReadStream } = require('fs');

const cleanWater = createReadStream('./textfile.txt');

const forMe = createWriteStream('./for-me.txt');

cleanWater.pipe(forMe).on('error', (err) => {
    console.log('Water is polluted. Stop.');
    console.log('Psst... Here is the error: ' + err);
});