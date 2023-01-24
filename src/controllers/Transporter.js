import { Credential } from '../models/models.js';

class TransporterController {
  list = async () => {
    try {
      return await Credential.find();
    } catch (error) {
      throw error;
    }
  }
}

export default new TransporterController;