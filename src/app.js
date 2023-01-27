import http from 'node:http';
import dotenv from 'dotenv';

/**
 * Environments
 */
dotenv.config();

/**
 * Routes
 */
import { listEmails, createEmail, deleteAllEmails } from './routes/email.js';
import { listCredentials, createCredentials, deleteAllCredentials } from './routes/credential.js';
import { queueStart } from './routes/queue.js';

const router = {
  default: (_, response) => {
    response.write('Email Handler');
    response.end();
  },
  '/email:GET': listEmails,
  '/email:POST': createEmail,
  '/email/clean:DELETE': deleteAllEmails,

  '/credential:GET': listCredentials,
  '/credential:POST': createCredentials,
  '/credential/clean:DELETE': deleteAllCredentials,

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