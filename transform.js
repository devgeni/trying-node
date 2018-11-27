const { Transform } = require('stream');

class CharChanger extends Transform {
    constructor(char) {
        super();
        this.toChar = char;
    }

    _transform(chunk, ncoding, callback) {
        const transformed = String(chunk)
            .replace(/\w/g, this.toChar);
        
        this.push(transformed);
        callback();
    }

}

const passwordSimulator = new CharChanger('*');

process.stdin.pipe(passwordSimulator).pipe(process.stdout);