import { messages, statusCodes } from '../utils/constants.js';

export default class ConflictingEmailError extends Error {
  constructor() {
    super(messages.CONFLICTING_EMAIL);
    this.statusCode = statusCodes.CONFLICT;
  }
}
