const { nanoid } = require("nanoid");
const { Pool } = require("pg");
const InvariantError = require("../../exceptions/InvariantError");
const NotFoundError = require("../../exceptions/NotFoundError");
const AuthorizationError = require("../../exceptions/AuthorizationError");
const { mapPlaylistToModel } = require("../../utils");

class PlaylistSongsService {
  constructor() {
    this._pool = new Pool();
  }

  async addPlaylistSong({ playlistId, songId, owner }) {
    const id = `playlistsong-${nanoid(16)}`;

    const queryCheck = {
      text: "SELECT * FROM playlists WHERE id = $1 AND owner = $2",
      values: [playlistId, owner],
    };

    const resultCheck = await this._pool.query(queryCheck);

    if (!resultCheck.rows.length) {
      throw new AuthorizationError("Tidak memiliki akses ke playlist");
    }

    const query = {
      text: "INSERT INTO playlistsongs VALUES($1, $2, $3) RETURNING id",
      values: [id, playlistId, songId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError("PlaylistSong gagal ditambahkan");
    }
    return result.rows[0].id;
  }

  async getPlaylistSongs() {
    const result = await this._pool.query({
      text: "SELECT id, playlist_id, song_id FROM playlistsongs",
      values: [],
    });
    return result.rows.map(mapPlaylistToModel);
  }

  async deletePlaylistSongById({ playlistId, songId }) {
    const query = {
      text: "DELETE FROM playlistsongs WHERE playlist_id = $1 AND song_id = $2 RETURNING id",
      values: [playlistId, songId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Playlistsong gagal dihapus. Id tidak ditemukan");
    }
  }
}

module.exports = PlaylistSongsService;
