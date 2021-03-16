const { baseResponse } = require("../utils/helpers/baseResponse");
const { user } = require("./../db/models");
const { hashing } = require("./../utils/helpers/hashPassword");

class UserController {
  static async createUser(req, res, next) {
    try {
      // const email = req.body.email
      const dataEmail = await user.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (dataEmail) {
        return baseResponse({ success: false, message: "Email harus unique" })(
          res,
          200
        );
      }

      const { salt, hash } = hashing(req.body.password);

      const data = await user.create({
        fullname: req.body.fullname,
        username: req.body.username,
        email: req.body.email,
        password: hash,
        salt: salt,
        photo: req.body.photo,
        role: req.body.role,
      });
      return baseResponse({ message: "success create new user", data: data })(
        res,
        201
      );
    } catch (error) {
      res.status(500);
      next(error);
    }
  }

  static async getAllUser(req, res, next) {
    try {
      const data = await user.findAll();
      return baseResponse({ message: "success get all user", data: data })(
        res,
        200
      );
    } catch (error) {
      res.status(500);
      next(error);
    }
  }

  static async getByIdUser(req, res, next) {
    try {
      const data = await user.findByPk(req.params.id);
      if (data) {
        return baseResponse({ message: "success get by id", data: data })(
          res,
          200
        );
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

  static async updateUser(req, res, next) {
    try {
      const { salt, hash } = hashing(req.body.password);
      const newData = {
        fullname: req.body.fullname,
        username: req.body.username,
        email: req.body.email,
        password: hash,
        salt: salt,
        photo: req.body.photo,
        role: req.body.role,
      };
      const data = await user.update(newData, {
        where: {
          id: req.params.id,
        },
      });
      if (data[0]) {
        const datanew = await user.findByPk(req.params.id);
        return baseResponse({ message: "success", data: datanew })(res, 200);
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

  static async deleteUser(req, res, next) {
    try {
      const data = await user.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (data) {
        return baseResponse({ message: "success deleted", data: data })(
          res,
          200
        );
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

  static async uploadUser(req, res, next) {
    try {
      const file = req.file.path;
      const id = req.params.id;

      const data = await user.findByPk(id);
      // console.log(data.dataValues.title)
      const dataUrl = {
        fullname: data.dataValues.fullname,
        username: data.dataValues.username,
        email: data.dataValues.email,
        password: data.dataValues.password,
        salt: data.dataValues.salt,
        photo: file,
        role: data.dataValues.role,
      };

      if (data) {
        const dataupdate = await user.update(dataUrl, {
          where: {
            id: id,
          },
        });
        const data = await user.findByPk(id);
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
module.exports = UserController;
