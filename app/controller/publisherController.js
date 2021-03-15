const { baseResponse } = require("./../utils/helpers/baseResponse");
const { publisher } = require("./../db/models");

class PublisherController {
  static async createPublisher(req, res, next) {
    try {
      const email = req.body.email;
      const dataEmail = await publisher.findOne({
        where: {
          email: email,
        },
      });
      if (dataEmail) {
        return baseResponse({ success: false, message: "Email harus unique" })(
          res,
          200
        );
      }
      const dataCreate = await publisher.create({
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        phone: req.body.phone,
        website: req.body.website,
      });
      return baseResponse({ message: "success create data", data: dataCreate })(
        res,
        201
      );
    } catch (error) {
      res.status(500);
      next(error);
    }
  }

  static async getAllPublisher(req, res, next) {
    try {
      const dataPub = await publisher.findAll();
      return baseResponse({ message: "data all publisher", data: dataPub })(
        res,
        200
      );
    } catch (error) {
      res.status(500);
      next(error);
    }
  }

  static async getByIdPublisher(req, res, next) {
    try {
      const dataPub = await publisher.findByPk(req.params.id);
      if (dataPub) {
        return baseResponse({ message: "success", data: dataPub })(res, 200);
      }
      return baseResponse({ success: false, message: "Data doesn't exist" })(
        res,
        200
      );
    } catch (error) {
      res.status(500);
      next(error);
    }
  }

  static async updatePublisher(req, res, next) {
    try {
      const email = req.body.email;
      const dataEmail = await publisher.findOne({
        where: {
          email: email,
        },
      });
      if (dataEmail) {
        return baseResponse({ success: false, message: "Email harus unique" })(
          res,
          200
        );
      }

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
        return baseResponse({ success: true, message: "success", data: data })(
          res,
          200
        );
      }
      return baseResponse({
        success: false,
        message: "data doesn't exist",
      })(res, 200);
    } catch (error) {
      res.status(500);
      next(error);
    }
  }

  static async deletPublisher(req, res, next) {
    try {
      const dataPub = await publisher.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (dataPub) {
        return baseResponse({
          success: true,
          message: "success",
          data: dataPub,
        })(res, 200);
      }
      return baseResponse({
        success: false,
        message: "data doesn't exist",
        data: [],
      })(res, 200);
    } catch (error) {
      res.status(500);
      next(error);
    }
  }

  static async getAllBookPublisher(req, res, next) {
    try {
      const dataBook = await publisher.findByPk(req.params.id, {
        include: book,
      });
      if (dataBook) {
        return baseResponse({
          success: true,
          message: "success",
          data: dataBook,
        })(res, 200);
      }
      return baseResponse({
        success: false,
        message: "data doesn't exist",
        data: [],
      })(res, 200);
    } catch (error) {
      res.status(500);
      next(error);
    }
  }
}

module.exports = PublisherController;
