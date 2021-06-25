/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
const PlaylistsHandler = require("./handler");
const routes = require("./routes");

module.exports = {
  name: "playlists",
  version: "1.0.0",
  register: async (server, { service, validator }) => {
    const playlistsHandler = new PlaylistsHandler(service, validator);
    server.route(routes(playlistsHandler));
  },
};
