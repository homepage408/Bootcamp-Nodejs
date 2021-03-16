// const { extractRequestData } = require("@sentry/node/dist/handlers");
const { baseResponse } = require("../utils/helpers/baseResponse");
const { vehicle } = require("./../db/models");
const { Op } = require("sequelize");

class VehicleController {
  static async createVehicle(req, res, next) {
    try {
      const data = await vehicle.create({
        name: req.body.name,
        typeId: req.body.typeId,
        hourlyPrice: req.body.hourlyPrice,
        licensePlate: req.body.licensePlate,
        status: "off",
        photo: req.body.photo,
      });
      return baseResponse({ message: "success created vehicle", data: data })(
        res,
        201
      );
    } catch (error) {
      res.status(500);
      next(error);
    }
  }

  static async getAllVehicle(req, res, next) {
    try {
      const data = await vehicle.findAll();
      return baseResponse({ message: "success", data: data })(res, 200);
    } catch (error) {
      res.status(500);
      next(error);
    }
  }

  static async getAllVehicleOffRent(req, res, next) {
    try {
      const data = await vehicle.findAll({
        where: {
          [Op.or]: [{ status: "off" }, { status: "rent" }],
        },
      });
      if (data) {
        return baseResponse({ message: "success", data: data })(res, 200);
      }
      return baseResponse({
        success: false,
        message: "data doesn't exist",
        data: data,
      })(res, 200);
    } catch (error) {
      res.status(500);
      next(error);
    }
  }

  static async getByIdVehicle(req, res, next) {
    try {
      const data = await vehicle.findByPk(req.params.id);
      if (data) {
        return baseResponse({ message: "success", data: data })(res, 200);
      }
      return baseResponse({
        success: false,
        message: "data doesn't exist",
        data: data,
      })(res, 200);
    } catch (error) {
      res.status(500);
      next(error);
    }
  }

  static async updateVehicle(req, res, next) {
    try {
      const newData = {
        name: req.body.name,
        typeId: req.body.typeId,
        hourlyPrice: req.body.hourlyPrice,
        licensePlate: req.body.licensePlate,
        status: req.body.status,
        photo: req.body.photo,
      };
      const data = await vehicle.update(newData, {
        where: {
          id: req.params.id,
        },
      });
      if (data[0]) {
        const dataNew = await vehicle.findByPk(req.params.id);
        return baseResponse({ message: "success", data: dataNew })(res, 200);
      }
      return baseResponse({ success: false, message: "data doesn't exist" })(
        res,
        200
      );
    } catch (error) {
      res.status(500);
      next(error);
    }
  }

  static async deletVehicle(req, res, next) {
    try {
      const data = await vehicle.destroy({
        where: {
          id: req.params.id,
        },
      });

      if (data) {
        return baseResponse({ message: "data success deleted" })(res, 200);
      }
      return baseResponse({ success: false, message: "data doesnt exist" });
    } catch (error) {
      res.status(500);
      next(error);
    }
  }

  static async uploadVehicle(req, res, next) {
    try {
      const file = req.file.path;
      const id = req.params.id;

      const data = await vehicle.findByPk(id);
      // console.log(data.dataValues.title)
      const dataUrl = {
        name: data.dataValues.name,
        typeId: data.dataValues.typeId,
        hourlyPrice: data.dataValues.hourlyPrice,
        licensePlate: data.dataValues.licensePlate,
        status: data.dataValues.status,
        photo: file,
      };

      if (data) {
        const dataupdate = await vehicle.update(dataUrl, {
          where: {
            id: id,
          },
        });
        const data = await vehicle.findByPk(id);
        return baseResponse({ success: true, message: "success", data: data })(
          res,
          201
        );
      }
      return baseResponse({
        success: false,
        message: "data tidak ketemu",
        data: [],
      })(res, 200);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = VehicleController;
