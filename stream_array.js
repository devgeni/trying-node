const { Readable } = require('stream');

const array = [
    "one",
    "two",
    "three",
    "four",
    "five"
];

class StreamArray extends Readable {
    constructor (arr) {
        // super({ encoding: 'UTF-8' });
        super({ objectMode: true });
        this.array = arr;
        this.index = 0;
    }

    _read() {
        if (this.index < this.array.length) {
            // const data = this.array[this.index];
            const data = {
                data: this.array[this.index],
                index: this.index
            };
            this.push(data);
            this.index += 1;
        } else {
            this.push(null);
        }
    }
}

const arrStream = new StreamArray(array);

arrStream.on('data', console.log);
arrStream.on('end', () => console.log('stream has been closed!'));