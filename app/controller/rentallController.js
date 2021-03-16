const { baseResponse } = require("../utils/helpers/baseResponse");
const { rental, vehicle } = require("../db/models");

class RentalController {
  static async createRental(req, res, next) {
    try {
      const newData = {
        userId: req.body.userId,
        vehicleId: req.body.vehicleId,
        totalPrice: 0,
        startAt: new Date(),
        backAt: null,
      };
      const data = await rental.create(newData);
      if (data) {
        const status = {
          status: "rent",
        };
        const dataVehicle = await vehicle.update(status, {
          where: {
            id: req.body.vehicleId,
          },
        });
        return baseResponse({ message: "success create rentall", data: data })(
          res,
          200
        );
      }
    } catch (error) {
      res.status(500);
      next(error);
    }
  }

  static async getAllRental(req, res, next) {
    try {
      const data = await rental.findAll();
      return baseResponse({ message: "success get all", data: data })(res, 200);
    } catch (error) {
      res.status(500);
      next(error);
    }
  }

  static async getTotalPrice(req, res, next) {
    try {
      const getPrice = await vehicle.findByPk(req.params.id);
      const getTanggal = await rental.findOne({
        where: {
          vehicleId: req.params.id,
        },
      });

      const harga = getPrice.dataValues.hourlyPrice;
      const tanggalStartAt = getTanggal.dataValues.startAt;

      if (getPrice) {
        // console.log(harga);
        let totalPrice = ((new Date() - tanggalStartAt) / 1000 / 3600) * harga;
        // let totalPrice = harga * (691200 / 3600);

        const data = {
          userId: getTanggal.dataValues.userId,
          vehicleId: getTanggal.dataValues.vehicleId,
          totalPrice: Math.ceil(totalPrice),
          startAt: tanggalStartAt,
          backAt: new Date(),
          status: req.body.status
        };
        const dataTotalPrice = await rental.update(data,{
            where:{
                vehicleId: req.params.id,
            }
        })
        const status = {
            status: "off",
          };
          const dataVehicle = await vehicle.update(status, {
            where: {
              id: req.params.id,
            },
          });
        const dataBaru = await rental.findOne({
            where:{
                vehicleId:req.params.id
            }
        })
        return baseResponse({
          message: "success",
          data: dataBaru,
        })(res, 200);
      }
      return baseResponse({
        success: false,
        message: "Tidak ada",
        data: getPrice,
      })(res, 200);
    } catch (error) {
      res.status(500);
      next(error);
    }
  }
}

module.exports = RentalController;
