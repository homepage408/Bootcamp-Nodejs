const { publisher, book } = require("./../db/models");
const response = require("./../response/response");
const BookController = require("./bookController");

class PublisherController {
  static async createPublisher(req, res) {
    try {
      const dataCreate = await publisher.create({
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        phone: req.body.phone,
        website: req.body.website,
      });
      return response.success("success create publisher", dataCreate, 201, res);
    } catch (error) {
      return response.notSuccess(error.message, error, 500, res);
    }
  }

  static async getAllPublisher(req, res) {
    try {
      const dataPublisher = await publisher.findAll();
      return response.success("users retrieved", dataPublisher, 200, res);
    } catch (error) {
      return response.notSuccess(error.message, error, 500, res);
    }
  }

  static async getByIdPublisher(req, res) {
    try {
      const dataPub = await publisher.findByPk(req.params.id);
      if (dataPub) {
        return response.success("success", dataPub, 200, res);
      }
      return response.notSuccess("data doesn't exist", [], 200, res);
    } catch (error) {
      return response.notSuccess(error.message, error, 500, res);
    }
  }

  static async updatePublisher(req, res) {
    try {
      const newData = {
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        phone: req.body.phone,
        website: req.body.website,
        updatedAt: new Date(),
      };
      const dataUpdate = await publisher.update(newData, {
        where: {
          id: req.params.id,
        },
      });

      if (dataUpdate[0]) {
        const data = await publisher.findByPk(req.params.id);
        return response.success("updated successfully", data, 201, res);
      }
      return response.notSuccess("data doesn't exist", [], 200, res);
    } catch (error) {
      return response.notSuccess(error.message, error, 500, res);
    }
  }

  static async deletePublisher(req, res) {
    try {
      const dataPub = await publisher.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (dataPub) {
        return response.success("deleted successfully", dataPub, 200, res);
      }
      return response.notSuccess("data doesn't exist", [], 200, res);
    } catch (error) {
      return response.notSuccess(error.message, error, 500, res);
    }
  }

  static async getAllBookPublisher(req, res) {
    try {
      const dataBook = await publisher.findByPk(req.params.id, {
        include: book,
      });
      if (dataBook) {
        return response.success("success", dataBook, 200, res);
      }
      return response.notSuccess("doesn't exist", [], 200, res);
    } catch (error) {
      return response.notSuccess(error.message, error, 500, res);
    }
  }
}

module.exports = PublisherController;
