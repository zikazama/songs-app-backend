/* eslint-disable linebreak-style */
/* eslint-disable no-empty-function */
/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable constructor-super */
class NotFoundError extends ClientError {
  constructor(message) {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}
