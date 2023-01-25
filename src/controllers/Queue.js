import { Email } from '../models/models.js';
import { Readable } from 'node:stream';
import { WritableStream } from 'node:stream/web';

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
        response.write(chunk);
      },
      close() {
        console.log('Emails processed: ' + items);
        response.end(JSON.stringify({
          status: true,
          message: `Emails processed: ${items}`
        }));
      },
    }))
  }
}

export default new Queue;