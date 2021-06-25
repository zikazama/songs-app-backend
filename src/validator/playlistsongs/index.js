/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
const InvariantError = require('../../exceptions/InvariantError');
const { PlaylistsongPayloadSchema } = require('./schema');

const PlaylistsongsValidator = {
  validatePlaylistSongPayload: (payload) => {
    const validationResult = PlaylistsongPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = PlaylistsongsValidator;