import Email from '../controllers/Email.js';

export const listEmails = async (request, response) => {
  const emails = Email.list();
  response.end(JSON.stringify({
    status: true,
    emails
  }));
};