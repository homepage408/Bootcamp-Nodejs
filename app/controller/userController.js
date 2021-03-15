const { baseResponse } = require("../utils/helpers/baseResponse");
const { user } = require("./../db/models");
const { hashing } = require("./../utils/helpers/hashPassword");

class UserController {
  static async createUser(req, res, next) {
    try {
      const { salt, hash } = hashing(req.body.password);

      const newData = await user.create({
        username: req.body.username,
        fullname: req.body.fullname,
        email: req.body.email,
        password: hash,
        salt: salt,
        photo: req.body.photo,
        role: req.body.role,
      });
      return baseResponse({ message: "success create user", data: newData })(
        res,
        201
      );
    } catch (error) {
      next(error);
    }
  }

  static async getAllUser(req, res, next) {
    try {
      const dataUser = await user.findAll();
      return baseResponse({ message: "All users", data: dataUser })(res, 200);
    } catch (error) {
      next(error);
    }
  }

  static async getByIdUser(req, res, next) {
    try {
      const dataUser = await user.findByPk(req.params.id);
      if (dataUser) {
        return baseResponse({ message: "find by id", data: dataUser })(
          res,
          200
        );
      }
      return baseResponse({ success: false, message: "not found" })(res, 200);
    } catch (error) {
      res.status(500);
      next(error);
    }
  }

  static async uploadPhoto(req, res, next) {
    try {
      const file = req.file.path;
      const id = req.params.id;

      const data = await user.findByPk(id);
      const dataPhoto = {
        username: data.dataValues.username,
        fullname: data.dataValues.fullname,
        email: data.dataValues.email,
        password: data.dataValues.password,
        salt: data.dataValues.salt,
        photo: file,
        role: data.dataValues.role,
      };
      console.log(data.dataValues.id);
      if (data) {
        if (data.dataValues.id == id) {
          const dataUpdate = await user.update(dataPhoto, {
            where: {
              id: id,
            },
          });
          const newData = await user.findByPk(id);
          return baseResponse({
            message: "success updated photo",
            data: newData,
          })(res, 200);
        } else {
          return baseResponse({ success: false, message: "id tidak sama" })(
            res,
            200
          );
        }
        // return baseResponse({ success: false, message: "data tidak ada" });
      }
    } catch (error) {
      res.status(500);
      next(error);
    }
  }
}

module.exports = UserController;
