import Email from '../controllers/Email.js';

export const listEmails = async (request, response) => {
  const emails = await Email.list();

  response.end(JSON.stringify({
    status: true,
    emails
  }));
};

export const deleteAllEmails = async (request, response) => {
  await Email.clean();

  response.end(JSON.stringify({
    status: false,
  }));
};

export const createEmail = async (request, response) => {
  let body = {}

  request.on('data', (chunk) => {
    body = { ...JSON.parse(chunk), };
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