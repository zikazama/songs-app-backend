const { nanoid } = require('nanoid');
const songs = require('./songs');

const addSongHandler = (request, h) => {
  const {
    title,
    year,
    performer,
    genre,
    duration,
  } = request.payload;

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newSong = {
    title,
    year,
    performer,
    genre,
    duration,
    id,
    insertedAt,
    updatedAt,
  };

  songs.push(newSong);

  const isSuccess = songs.filter((Song) => Song.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Lagu berhasil ditambahkan',
      data: {
        SongId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Lagu gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getAllSongsHandler = (request, h) => {
  const { name, reading, finished } = request.query;

  let songsGet = songs;
  songsGet = songsGet.foreach((song) => {
    song.id,
    song.title,
    song.performer
  });

  // if (name !== undefined) {
  //   songsGet = songsGet.filter((Song) => Song.name.toLowerCase().includes(name.toLowerCase()));
  //   const response = h.response({
  //     status: 'success',
  //     data: {
  //       songs: songsGet,
  //     },
  //     query: request.query,
  //   });
  //   response.code(200);
  //   return response;
  // }
  // if (reading !== undefined) {
  //   let boolReading = true;
  //   if (reading === '0') {
  //     boolReading = false;
  //   }
  //   songsGet = songsGet.filter((Song) => Song.reading === boolReading);
  // }
  // if (finished !== undefined) {
  //   let boolFinished = true;
  //   if (finished === '0') {
  //     boolFinished = false;
  //   }
  //   songsGet = songsGet.filter((Song) => Song.finished === boolFinished);
  // }

  const response = h.response({
    status: 'success',
    data: {
      songs: songsGet,
    },
    query: request.query,
  });
  response.code(200);
  return response;
};

const getSongByIdHandler = (request, h) => {
  const { id } = request.params;

  const Song = songs.filter((n) => n.id === id)[0];

  if (Song !== undefined) {
    const response = h.response({
      status: 'success',
      data: {
        Song,
      },
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Lagu tidak ditemukan',
  });
  response.code(404);
  return response;
};

const editSongByIdHandler = (request, h) => {
  const { id } = request.params;

  const {
    title,
    year,
    performer,
    genre,
    duration,
  } = request.payload;

  // if (readPage > pageCount) {
  //   const response = h.response({
  //     status: 'fail',
  //     message:
  //       'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
  //   });
  //   response.code(400);
  //   return response;
  // }

  // if (name === undefined) {
  //   const response = h.response({
  //     status: 'fail',
  //     message: 'Gagal memperbarui buku. Mohon isi nama buku',
  //   });
  //   response.code(400);
  //   return response;
  // }

  const updatedAt = new Date().toISOString();

  const index = songs.findIndex((Song) => Song.id === id);

  if (index !== -1) {
    songs[index] = {
      ...songs[index],
      title,
      year,
      performer,
      genre,
      duration,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Lagu berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui lagu. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteSongByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = songs.findIndex((Song) => Song.id === id);

  if (index !== -1) {
    songs.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Lagu berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Lagu gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addSongHandler,
  getAllSongsHandler,
  getSongByIdHandler,
  editSongByIdHandler,
  deleteSongByIdHandler,
};
