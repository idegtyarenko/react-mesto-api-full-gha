import { messages, statusCodes } from '../utils/constants.js';

export default class ValidationError extends Error {
  constructor() {
    super(messages.VALIDATION_ERROR);
    this.statusCode = statusCodes.BAD_REQUEST;
  }
}
