import jwt from 'jsonwebtoken';

export const createAccess = (id) => {
  const payload = { credentialId: id };
  const secretPass = process.env.SECRET_PASS;
  const accessToken = jwt.sign(payload, secretPass, { expiresIn: '1440m' });
  return accessToken;
};

export const whoIs = (accessToken) => {
  const secretPass = process.env.SECRET_PASS;
  const decodedId = jwt.verify(accessToken, secretPass);
  return decodedId;
}