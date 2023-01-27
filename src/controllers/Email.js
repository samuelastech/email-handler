import { Email } from '../models/models.js';
import * as z from 'zod';

class EmailController {
  list = async () => {
    try {
      return await Email.find();
    } catch (error) {
      throw error;
    }
  }

  create = async (email) => {
    try {
      const result = this.#validate(email);
      return await Email.create(result);
    } catch (error) {
      throw error;
    }
  }

  clean = async () => {
    try {
      await Email.deleteMany();
    } catch (error) {
      throw error;
    }
  }

  #validate = (email) => {
    const emailBody = z.object({
      to: z.string().email().array().or(z.string().email()),
      subject: z.string(),
      text: z.string(),
      priority: z.number(),
    });

    return emailBody.parse(email);
  }
}

export default new EmailController;