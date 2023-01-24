import { Credential } from '../models/models.js';
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
      return await Credential.findOneAndUpdate(
        { auth: { user: result.user }, host: result.host },
        { result },
        { upsert: true }
      );
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