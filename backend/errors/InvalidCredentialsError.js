import { messages, statusCodes } from '../utils/constants.js';

export default class InvalidCredentialsError extends Error {
  constructor() {
    super(messages.INVALID_CREDENTIALS);
    this.statusCode = statusCodes.UNAUTHORIZED;
  }
}
