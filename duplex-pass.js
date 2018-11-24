const { PassThrough, Duplex } = require('stream');
const { createReadStream, createWriteStream } = require('fs');

const source = createReadStream('./textfile.txt');
const destination = createWriteStream('./copyfile.txt');

class Throttle extends Duplex {

    constructor(ms) {
        super();
        this.delay = ms;
    }

    _write(chunk, ncoding, callback) {
        this.push(chunk);
        setTimeout(callback, this.delay);
    }

    _read() {

    }

    _final() {
        this.push(null);
    }
}

const report = new PassThrough();
const throttle = new Throttle(1000);

let total = 0;

report.on('data', (chunk) => {
    total += chunk.length;
    console.log(`total bytes: ${total}  `);
});

source.pipe(throttle).pipe(report).pipe(destination);