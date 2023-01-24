import { Email } from '../models/models.js';

class EmailController {
  list = async () => {
    try {
      return await Email.find();
    } catch (error) {
      throw error;
    }
  }
}

export default new EmailController;