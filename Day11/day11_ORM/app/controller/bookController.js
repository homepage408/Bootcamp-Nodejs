const { publisher, book, author } = require("./../db/models");
const response = require("./../response/response");

class BookController {
  static async createBook(req, res) {
    try {
      const bookCreate = await book.create({
        authorId: req.body.authorId,
        publisherId: req.body.publisherId,
        title: req.body.title,
        price: req.body.price,
        year: req.body.year,
      });
      return response.success("success", bookCreate, 201, res);
    } catch (error) {
      return response.notSuccess(error.message, error, 500, res);
    }
  }

  static async getAllBook(req, res) {
    try {
      const getAll = await book.findAll();
      return response.success("success", getAll, 200, res);
    } catch (error) {
      return response.notSuccess(error.message, error, 500, res);
    }
  }

  static async getBookById(req, res) {
    try {
      const dataBook = await book.findByPk(req.params.id);
      if (dataBook) {
        return response.success("success", dataBook, 200, res);
      }
      return response.notSuccess("doesn't exist", [], 200, res);
    } catch (error) {
      return response.notSuccess(error.message, error, 500, res);
    }
  }

  static async updateBook(req, res) {
    try {
      const newBook = {
        authorId: req.body.authorId,
        publisherId: req.body.publisherId,
        title: req.body.title,
        price: req.body.price,
        year: req.body.year,
      };

      const dataUpdateBook = await book.update(newBook, {
        where: {
          id: req.params.id,
        },
      });

      if (dataUpdateBook[0]) {
        const data = await book.findByPk(req.params.id);
        return response.success("success", data, 200, res);
      }
      return response.notSuccess("data doesn't exist", [], 200, res);
    } catch (error) {
      return response.notSuccess(error.message, error, 500, res);
    }
  }

  static async deleteBooks(req, res) {
    try {
      const dataDel = await book.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (dataDel) {
        return response.success("deleted success", dataDel, 200, res);
      }
      return response.notSuccess("data doesn't exist", [], 200, res);
    } catch (error) {
      return response.notSuccess(error.message, error, 500, res);
    }
  }
}

module.exports = BookController;
