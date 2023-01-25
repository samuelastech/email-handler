import Queue from '../controllers/Queue.js';

export const queueStart = (request, response) => {
  Queue.start(response);
};