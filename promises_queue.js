const fs = require('fs');

const pause = (seconds) => new Promise(resolve => {
    setTimeout(resolve, seconds * 1000);
});

const toX = () => 'X';

const tasks = [
    pause(4),
    pause(1),
    pause(2),
    pause(4),
    pause(8),
    pause(4),
    pause(4),
    pause(3),
    pause(8),
    pause(4),
    pause(5),
];

class PromiseQueue {
    constructor (promises = [], concurrentCount = 1) {
        this.concurrent = concurrentCount;
        this.total = promises.length;
        this.todo = promises;
        this.running = [];
        this.complete = [];
    }

    get queueNotFull() {
        return (this.running.length < this.concurrent) && this.todo.length;
    }

    run () {
        while (this.queueNotFull) {
            const promise = this.todo.shift();
            this.running.push(promise);
            promise.then( () => {
                this.complete.push(this.running.shift());
                this.run();
            });

            console.log(`
            todo: [${this.todo.map(toX)}],
            running: [${this.running.map(toX)}],
            complete: [${this.complete.map(toX)}]
            `)
        }
    }
}

const pauseQueue = new PromiseQueue(tasks, 3);
pauseQueue.run();