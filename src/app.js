import http from 'node:http';
import dotenv from 'dotenv';

/**
 * Environments
 */
dotenv.config();

/**
 * Routes
 */
const router = {
  default: (_, response) => {
    response.write('Email Handler');
    response.end();
  },
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