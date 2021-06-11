/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
const SongsHandler = require("./handler");
const routes = require("./routes");

module.exports = {
  name: "songs",
  version: "1.0.0",
  register: async (server, { service, validator }) => {
    const SongsHandler = new SongsHandler(service, validator);
    server.route(routes(songsHandler));
  },
};
