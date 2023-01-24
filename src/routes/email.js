import Email from '../controllers/Email.js';
import { parseCookies } from '../lib/cookieParser.js';
import { whoIs } from '../lib/token.js';

export const listEmails = async (request, response) => {
  const emails = await Email.list();

  response.end(JSON.stringify({
    status: true,
    emails
  }));
};

export const createEmail = async (request, response) => {
  const { accessToken } = parseCookies(request);

  if (!accessToken) {
    response.writeHead(400);
    response.end(JSON.stringify({
      status: false,
      message: 'token not found',
    }));
    return;
  }

  const { credentialId } = whoIs(accessToken);
  let body = {}

  request.on('data', (chunk) => {
    body = {
      credential: credentialId,
      ...JSON.parse(chunk),
    };
  });

  request.on('end', async () => {
    await Email.create(body);
    response.writeHead(201);
    response.end(JSON.stringify({
      status: true,
      message: 'email was created'
    }));
  });
};