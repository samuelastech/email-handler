import { Credential } from '../models/models.js';
import nodemailer from 'nodemailer';
import * as z from 'zod';

class TransporterController {
  list = async () => {
    try {
      return await Credential.find();
    } catch (error) {
      throw error;
    }
  }

  create = async (credential) => {
    try {
      const result = this.#validate(credential);
      return await Credential.create(result);
    } catch (error) {
      throw error;
    }
  }

  send = async (infos) => {
    try {
      const credential = (await Credential.find().select('-_id -__v'))[0];
      const transporterOptions = {
        host: credential.host,
        port: credential.port,
        secure: credential.secure,
        auth: {
          user: credential.auth.user,
          pass: credential.auth.pass
        }
      }

      const transporter = nodemailer.createTransport(transporterOptions);
      const result = await transporter.sendMail({
        from: infos.from,
        subject: infos.subject,
        to: infos.to,
        text: infos.text
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  me = async () => {
    try {
      return (await Credential.find())[0];
    } catch (error) {
      throw error;
    }
  }

  clean = async () => {
    try {
      await Credential.deleteMany();
    } catch (error) {
      throw error;
    }
  }

  #validate = (credential) => {
    const credentialBody = z.object({
      host: z.string(),
      port: z.number(),
      secure: z.boolean(),
      auth: z.object({
        user: z.string(),
        pass: z.string(),
      }),
    });

    return credentialBody.parse(credential);
  }
}

export default new TransporterController;