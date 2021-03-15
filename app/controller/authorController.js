const { baseResponse } = require("./../utils/helpers/baseResponse");
const { author, book } = require("./../db/models");

class AuthorController {
  static async createAuthor(req, res, next) {
    try {
      const email = req.body.email;
      const dataEmail = await author.findOne({
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

      const dataAuthor = await author.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password
      });
      return baseResponse({ message: "success", data: dataAuthor })(res, 201);
    } catch (error) {
      next(error);
    }
  }

  static async getAllAuthor(req, res, next) {
    try {
      const dataAuthor = await author.findAll();
      return baseResponse({ message: "success", data: dataAuthor })(res, 200);
    } catch (error) {
      next(error);
    }
  }

  static async getByIdAuthor(req, res, next) {
    try {
      const dataPub = await author.findByPk(req.params.id);
      if (dataPub) {
        return baseResponse({ message: "success", data: dataPub })(res, 200);
      }
      return baseResponse({ success: false, message: "not found" })(res, 200);
    } catch (error) {
      next(error);
    }
  }

  static async updateAuthor(req, res, next) {
    try {
      const email = req.body.email;
      const dataEmail = await author.findOne({
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
        return baseResponse({ message: "success", data: data })(res, 200);
      }
      return baseResponse({ success: false, message: "not found" })(res, 200);
    } catch (error) {
      next(error);
    }
  }

  static async deleteAuthor(req, res, next) {
    try {
      const dataAuthor = await author.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (dataAuthor) {
        return baseResponse({ message: "success", data: dataAuthor })(res, 200);
      }
      return baseResponse({ success: false, message: "not found" })(res, 200);
    } catch (error) {
      next(error);
    }
  }

  static async getAllBookAuthor(req, res, next) {
    try {
      const dataBookAuthor = await author.findByPk(req.params.id, {
        include: book,
      });
      if (dataBookAuthor) {
        return baseResponse({ message: "success", data: dataBookAuthor })(
          res,
          200
        );
      }
      return baseResponse({ success: false, message: "not found" })(res, 200);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthorController;
