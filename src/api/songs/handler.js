class SongsHandler {
  constructor(service) {
    this._service = service;

    this.postNoteHandler = this.postNoteHandler.bind(this);
    this.getNotesHandler = this.getNotesHandler.bind(this);
    this.getNoteByIdHandler = this.getNoteByIdHandler.bind(this);
    this.putNoteByIdHandler = this.putNoteByIdHandler.bind(this);
    this.deleteNoteByIdHandler = this.deleteNoteByIdHandler.bind(this);
  }

  postSongHandler() {
    try {
      const {
        title = "untitled",
        year,
        performer,
        genre,
        duration,
      } = request.payload;

      const songId = this._service.addSong({
        title,
        year,
        performer,
        genre,
        duration,
      });

      const response = h.response({
        status: "success",
        message: "Lagu berhasil ditambahkan",
        data: {
          songId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      const response = h.response({
        status: "fail",
        message: error.message,
      });
      response.code(400);
      return response;
    }
  }
  getSongsHandler() {
    const songs = this._service.getSongs();
    return {
      status: "success",
      data: {
        songs,
      },
    };
  }
  getSongByIdHandler() {
    try {
      const { id } = request.params;
      const song = this._service.getSongById(id);
      return {
        status: "success",
        data: {
          song,
        },
      };
    } catch (error) {
      const response = h.response({
        status: "fail",
        message: error.message,
      });
      response.code(404);
      return response;
    }
  }
  putSongByIdHandler() {
    try {
      const { id } = request.params;
      this._service.editSongById(id, request.payload);

      return {
        status: "success",
        message: "Lagu berhasil diperbarui",
      };
    } catch (error) {
      const response = h.response({
        status: "fail",
        message: error.message,
      });
      response.code(404);
      return response;
    }
  }
  deleteSongByIdHandler() {
    const { id } = request.params;
    this._service.deleteSongById(id);
    return {
      status: 'success',
      message: 'Lagu berhasil dihapus',
    }
  }
}

module.exports = SongsHandler;
