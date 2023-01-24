import { Email } from '../models/models.js';
import { setTimeout } from 'node:timers/promises';
import { Readable, Writable } from 'node:stream';
import { WritableStream, TransformStream } from 'node:stream/web';

class Queue {
  start = async () => {
    let items = 0;

    const readable = new Readable({
      async read() {
        for await (const email of Email.find({ status: 'pending' })) {
          this.push(JSON.stringify(email));
          items++;
        }
        this.push(null);
      }
    });

    readable.pipe(new Writable({
      write(chunk, _, callback) {
        console.log(JSON.parse(chunk));
        callback();
      },
      final() {
        console.log('Emails processed: ' + items);
      }
    }))
  }

  emails = async function* () {

  }
}

export default new Queue;