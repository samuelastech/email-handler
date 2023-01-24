import Transport from '../controllers/Transporter.js';
import { createAccess } from '../lib/token.js';
import { parseCookies } from '../lib/cookieParser.js';

export const listCredentials = async (request, response) => {
  const credentials = await Transport.list();
  response.end(JSON.stringify({
    status: true,
    credentials
  }));
};

export const createCredentials = (request, response) => {
  let body = {};

  request.on('data', (chunk) => {
    body = { ...JSON.parse(chunk) }; // just one chunk
  });

  request.on('end', async () => {
    const mailer = await Transport.create(body);
    const accessToken = createAccess(mailer._id);

    response.writeHead(201, {
      "Set-Cookie": `accessToken=${accessToken}`,
    });

    response.end(JSON.stringify({
      status: true,
      message: 'credential created',
    }));
  });
}