import Transport from '../controllers/Transporter.js';

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
    await Transport.create(body);
  });

  response.writeHead(201);

  response.end(JSON.stringify({
    status: true,
    message: 'credential created'
  }));
}