import { statusCodes, messages } from '../utils/constants.js';

export default class UnauthorizedError extends Error {
  constructor() {
    super(messages.UNAUTHORIZED);
    this.statusCode = statusCodes.UNAUTHORIZED;
  }
}
