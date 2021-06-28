const { nanoid } = require("nanoid");
const { Pool } = require("pg");
const InvariantError = require("../../exceptions/InvariantError");
const NotFoundError = require("../../exceptions/NotFoundError");
const AuthorizationError = require("../../exceptions/AuthorizationError");
const { mapListSongToModel } = require("../../utils");

class PlaylistSongsService {
  constructor(collaborationService) {
    this._pool = new Pool();
    this._collaborationService = collaborationService;
  }

  async addPlaylistSong({ playlistId, songId, credentialId }) {
    const id = `playlistsong-${nanoid(16)}`;

    await this.verifyPlaylistAccess(playlistId, credentialId);

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

  async getPlaylistSongs({ playlistId, credentialId }) {
    await this.verifyPlaylistAccess(playlistId, credentialId);
    const result = await this._pool.query({
      text: "SELECT s.id, s.title, s.performer FROM playlistsongs ps JOIN songs s ON ps.song_id = s.id WHERE playlist_id = $1",
      values: [playlistId],
    });
    return result.rows.map(mapListSongToModel);
  }

  async deletePlaylistSongById({ playlistId, songId, credentialId }) {
    await this.verifySong(songId);
    await this.verifyPlaylistAccess(playlistId, credentialId);
    const query = {
      text: "DELETE FROM playlistsongs WHERE playlist_id = $1 AND song_id = $2 RETURNING id",
      values: [playlistId, songId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Playlistsong gagal dihapus. Id tidak ditemukan");
    }
  }

  async verifyPlaylistOwner(id, owner) {
    const query = {
      text: "SELECT * FROM playlists WHERE id = $1",
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Resource yang Anda minta tidak ditemukan");
    }

    const playlist = result.rows[0];

    if (playlist.owner !== owner) {
      throw new AuthorizationError("Anda tidak berhak mengakses resource ini");
    }
  }

  async verifySong(songId) {
    const query = {
      text: "SELECT * FROM songs WHERE id = $1",
      values: [songId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError("Resource yang Anda minta tidak ditemukan");
    }
  }

  async verifyPlaylistAccess(playlistId, userId) {
    try {
      await this.verifyPlaylistOwner(playlistId, userId);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      try {
        await this._collaborationService.verifyCollaborator(playlistId, userId);
      } catch {
        throw error;
      }
    }
  }
}

module.exports = PlaylistSongsService;
