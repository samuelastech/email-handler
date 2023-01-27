import Transport from '../controllers/Transporter.js';

export const listCredentials = async (request, response) => {
  const credentials = await Transport.list();
  response.end(JSON.stringify({
    status: true,
    credentials
  }));
};

export const deleteAllCredentials = async (request, response) => {
  const deleted = await Transport.clean();
  response.end(JSON.stringify({
    status: true,
    deleted
  }));
}

export const createCredentials = async (request, response) => {
  let body = {};

  if ((await Transport.list()).length > 0) {
    response.writeHead(401);

    response.end(JSON.stringify({
      status: false,
      message: "it's possible to have only one credential",
    }));

    return;
  }

  request.on('data', (chunk) => {
    body = { ...JSON.parse(chunk) }; // just one chunk
  });

  request.on('end', async () => {
    const credential = await Transport.create(body);

    response.end(JSON.stringify({
      status: true,
      message: 'credential created',
      credential
    }));
  });
}