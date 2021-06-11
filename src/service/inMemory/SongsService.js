const { nanoid } = require("nanoid");

class SongsService {
  constructor() {
    this._songs = [];
  }

  addSong({ title, year, performer, genre, duration }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newSong = {
      title,
      year,
      performer,
      genre,
      duration,
      id,
      createdAt,
      updatedAt,
    };

    this._songs.push(newSong);
  }

  getSongs() {
    return this._songs;
  }

  getSongById(id) {
    const song = this._songs.filter((n) => n.id === id)[0];
    if (!song) {
      throw new Error("Lagu tidak ditemukan");
    }
    return song;
  }

  editSongById(id, { title, year, performer, genre, duration }) {
    const index = this._songs.findIndex((song) => song.id === id);

    if (index === -1) {
      throw new Error("Gagal memperbarui lagu. Id tidak ditemukan");
    }

    const updatedAt = new Date().toISOString();

    this._songs[index] = {
      ...this._songs[index],
      title,
      year,
      performer,
      genre,
      duration,
      updatedAt,
    };
  }

  deleteSongById(id) {
    const index = this._songs.findIndex((song) => song.id === id);
    if (index === -1) {
      throw new Error("Lagu gagal dihapus. Id tidak ditemukan");
    }
    this._songs.splice(index, 1);
  }

}

module.exports = SongsService;
