import { Email } from '../models/models.js';
import { setTimeout } from 'node:timers/promises';
import { Readable, Writable } from 'node:stream';
import { WritableStream, TransformStream } from 'node:stream/web';

class Queue {
  start = async (response) => {
    let items = 0;

    const readable = new Readable.toWeb(new Readable({
      async read() {
        for await (const email of Email.find({ status: 'pending' })) {
          this.push(JSON.stringify(email));
          items++;
        }
        this.push(null);
      },
    }));

    readable.pipeTo(new WritableStream({
      write(chunk) {
        console.log(JSON.parse(Buffer.from(chunk)));
      },
      close() {
        console.log('Emails processed: ' + items);
      },
    }))
  }
}

export default new Queue;