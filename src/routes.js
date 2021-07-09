/*  eslint linebreak-style: ["error", "windows"]  */

const {
  addSongHandler,
  getAllSongsHandler,
  getSongByIdHandler,
  editSongByIdHandler,
  deleteSongByIdHandler,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/Songs',
    handler: addSongHandler,
  },
  {
    method: 'GET',
    path: '/Songs',
    handler: getAllSongsHandler,
  },
  {
    method: 'GET',
    path: '/Songs/{id}',
    handler: getSongByIdHandler,
  },
  {
    method: 'PUT',
    path: '/Songs/{id}',
    handler: editSongByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/Songs/{id}',
    handler: deleteSongByIdHandler,
  },
  // {
  //   method: "GET",
  //   path: "/picture.jpg",
  //   handler: {
  //     file: "picture.jpg",
  //   },
  // }
];

module.exports = routes;
