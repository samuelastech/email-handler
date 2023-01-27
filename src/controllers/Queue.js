import { Email } from '../models/models.js';
import { Readable } from 'node:stream';
import { WritableStream } from 'node:stream/web';
import Transporter from './Transporter.js';

class Queue {
  start = async (response) => {
    let items = 0;

    const readable = new Readable.toWeb(new Readable({
      async read() {
        for await (
          const email of Email
            .find({ status: 'pending' })
            .select('-__v')
        ) {
          email.sentAt = new Date();
          await email.save();
          this.push(JSON.stringify(email));
          items++;
        }
        this.push(null);
      },
    }));

    readable.pipeTo(new WritableStream({
      async write(chunk) {
        let infos = JSON.parse(Buffer.from(chunk));
        try {
          infos.from = await Transporter.me().from;
          await Transporter.send(infos);
        } catch (error) {
          console.log(error.name)
        }
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