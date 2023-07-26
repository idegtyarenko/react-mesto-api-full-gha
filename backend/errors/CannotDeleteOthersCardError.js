import { messages, statusCodes } from '../utils/constants.js';

export default class CannotDeleteOthersCardError extends Error {
  constructor() {
    super(messages.CANNOT_DELETE_OTHERS_CARD);
    this.statusCode = statusCodes.FORBIDDEN;
  }
}
