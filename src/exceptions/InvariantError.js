/* eslint-disable linebreak-style */
/* eslint-disable no-empty-function */
/* eslint-disable constructor-super */
/* eslint-disable no-unused-vars */
const ClientError = require('./ClientError');

class InvariantError extends ClientError {
  constructor(message) {
    super(message);
    this.name = 'InvariantError';
  }
}

module.exports = InvariantError;
