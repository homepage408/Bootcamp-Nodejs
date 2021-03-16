const { baseResponse } = require("../utils/helpers/baseResponse");
const { type, vehicle } = require("./../db/models");

class TypeController {
  static async getAllType(req, res, next) {
    try {
      const data = await type.findAll();
      return baseResponse({ message: "Get all types", data: data })(res, 200);
    } catch (error) {
      res.status(500);
      next(error);
    }
  }

  static async getAllVehicleFiltering(req, res, next) {
    try {
      const data = await type.findByPk(req.params.id, {
        include: vehicle,
      });
      if (data) {
        return baseResponse({ message: "success type", data: data })(res, 200);
      }
      return baseResponse({
        success: false,
        message: "Data type doesn't exist",
        data: data,
      })(res, 200);
    } catch (error) {
      res.status(500);
      next(error);
    }
  }

  static async createTypes(req, res, next) {
    try {
      const data = await type.create({
        name: req.body.name,
      });
      return baseResponse({ message: "success create", data: data })(res, 201);
    } catch (error) {
      res.status(500);
      next(error);
    }
  }

  static async updateTypes(req, res, next) {
    try {
      const newData = {
        name: req.body.name,
      };
      const data = await type.update(newData, {
        where: {
          id: req.params.id,
        },
      });
      if (data[0]) {
        const datanew = await type.findByPk(req.params.id);
        return baseResponse({ message: "success", data: datanew })(res, 200);
      }
      return baseResponse({ success: false, message: "data doesn't exist" })(
        res,
        200
      );
    } catch (error) {
      res.status(500);
      next(500);
    }
  }

  static async deleteTypes(req, res, next) {
    try {
      const data = await type.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (data) {
        return baseResponse({ message: "Deleted", data: data })(res, 200);
      }
      return baseResponse({
        success: false,
        message: "Data doesn't exist",
        data: data,
      })(res, 200);
    } catch (error) {
      res.status(500);
      next(error);
    }
  }
}

module.exports = TypeController;
