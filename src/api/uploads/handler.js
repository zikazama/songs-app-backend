const ClientError = require("../../exceptions/ClientError");

class UploadsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postUploadImageHandler = this.postUploadImageHandler.bind(this);
  }

  async postUploadImageHandler(request, h) {
    try {
      const { data } = request.payload;

      const size = Buffer.byteLength(data._data);
      let response = {};

      if (size < 864549) {
        this._validator.validateImageHeaders(data.hapi.headers);

        const filename = await this._service.writeFile(data, data.hapi);

        response = h.response({
          status: "success",
          data: {
            pictureUrl: `http://${process.env.HOST}:${process.env.PORT}/upload/images/${filename}`,
          },
        });
        response.code(201);
      } else {
        response = h.response({
          status: "fail",
        });
        response.code(413);
      }
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: "fail",
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: "error",
        message: "Maaf, terjadi kegagalan pada server kami.",
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
}

module.exports = UploadsHandler;
