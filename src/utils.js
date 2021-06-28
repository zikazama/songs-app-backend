/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
const mapDBToModel = ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  insertedAt,
  updatedAt,
}) => ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  insertedAt,
  updatedAt,
});

const mapListSongToModel = ({ id, title, performer }) => ({
  id,
  title,
  performer,
});

const mapPlaylistSongToModel = ({ id, playlist_id, songId }) => ({
  id,
  playlist_id,
  songId,
});

const mapPlaylistToModel = ({ id, name, username }) => ({
  id,
  name,
  username,
});

module.exports = {
  mapDBToModel, mapListSongToModel, mapPlaylistToModel, mapPlaylistSongToModel,
};
