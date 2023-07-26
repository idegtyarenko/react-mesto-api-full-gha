import { messages, statusCodes } from '../utils/constants.js';

export default class InvalidIdError extends Error {
  constructor() {
    super(messages.INVALID_ID);
    this.statusCode = statusCodes.BAD_REQUEST;
  }
}
