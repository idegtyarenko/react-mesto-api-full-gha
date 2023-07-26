import { statusCodes, messages } from '../utils/constants.js';

export default class NotFoundError extends Error {
  constructor() {
    super(messages.NOT_FOUND);
    this.statusCode = statusCodes.NOT_FOUND;
  }
}
