// const { response } = require('express')
const { author, book } = require("./../db/models");
const response = require("./../response/response");

class AuthorController {
  static async createAuthor(req, res) {
    try {
      const dataAuthor = await author.create({
        fisrtName: req.body.fisrtName,
        lastName: req.body.lastName,
        email: req.body.email,
      });
      return response.success("success", dataAuthor, 201, res);
    } catch (error) {
      return response.notSuccess(error.message, error, 500, res);
    }
  }

  static async getAllAuthor(req, res) {
    try {
      const dataAuthor = await author.findAll();
      return response.success("users retrieved", dataAuthor, 200, res);
    } catch (error) {
      return response.notSuccess(error.message, error, 500, res);
    }
  }

  static async getByIdAuthor(req, res) {
    try {
      const dataPub = await author.findByPk(req.params.id);
      if (dataPub) {
        return response.success("success", dataPub, 200, res);
      }
      return response.notSuccess("data doesn't exist", [], 200, res);
    } catch (error) {
      return response.notSuccess(error.message, error, 500, res);
    }
  }

  static async updateAuthor(req, res) {
    try {
      const newDataAuthor = {
        fisrtName: req.body.fisrtName,
        lastName: req.body.lastName,
        email: req.body.email,
      };

      const dataUpdateAuthor = await author.update(newDataAuthor, {
        where: {
          id: req.params.id,
        },
      });

      if (dataUpdateAuthor[0]) {
        const data = await author.findByPk(req.params.id);
        return response.success("success", data, 200, res);
      }
      return response.notSuccess("data doesn't exist", [], 200, res);
    } catch (error) {
      return response.notSuccess(error.message, error, 500, res);
    }
  }

  static async deleteAuthor(req, res) {
    try {
      const dataAuthor = await author.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (dataAuthor) {
        return response.success("deleted successfully", dataAuthor, 200, res);
      }
      return response.notSuccess("data doesn't exist", [], 200, res);
    } catch (error) {
      return response.notSuccess(error.message, error, 500, res);
    }
  }

  static async getAllBookAuthor(req, res) {
    try {
      const dataBookAuthor = await author.findByPk(req.params.id, {
        include: book,
      });
      if (dataBookAuthor) {
        return response.success("success", dataBookAuthor, 200, res);
      }
      return response.notSuccess("doesn't exist", [], 200, res);
    } catch (error) {
      return response.notSuccess(error.message, error, 500, res);
    }
  }
}

module.exports = AuthorController;
