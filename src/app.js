import http from 'node:http';
import dotenv from 'dotenv';

/**
 * Environments
 */
dotenv.config();

/**
 * Routes
 */
import { listEmails, createEmail } from './routes/email.js';
import { listCredentials, createCredentials } from './routes/credential.js';
import { queueStart } from './routes/queue.js';

const router = {
  default: (_, response) => {
    response.write('Email Handler');
    response.end();
  },
  '/email:GET': listEmails,
  '/email:POST': createEmail,
  '/credential:GET': listCredentials,
  '/credential:POST': createCredentials,
  '/queue/start:GET': queueStart,
};

const handleRequests = async (request, response) => {
  response.writeHead(200, {
    'Content-Type': 'application/json',
  });

  const { url, method } = request;
  const resource = `${url}:${method}`;
  const chosen = router[resource] || router.default;
  chosen(request, response);
};

const app = http.createServer(handleRequests);
export default app;