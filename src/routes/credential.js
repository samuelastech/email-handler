import Transport from '../controllers/Email.js';

export const listCredentials = async (request, response) => {
  const credentials = Transport.list();
  response.end(JSON.stringify({
    status: true,
    credentials
  }));
};