/*  eslint linebreak-style: ["error", "windows"]  */

const Hapi = require('@hapi/hapi');
const routes = require('./routes');
const songs = require('./api/songs');
const SongsService = require('./services/inMemory/SongsService');

const init = async () => {
  const songsService = new SongsService();
  
  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routes);

  await server.register({
    plugin: songs,
    options: {
      service: songsService,
    },
  });

  await server.start();
  // eslint-disable-next-line no-console
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
