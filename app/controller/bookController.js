const { book, Sequelize } = require("./../db/models");
const { baseResponse } = require("../utils/helpers/baseResponse");
const Op = Sequelize.Op;

class BookController {
  static async createBook(req, res, next) {
    try {
      const bookCreate = await book.create({
        authorId: req.body.authorId,
        publisherId: req.body.publisherId,
        title: req.body.title,
        price: req.body.price,
        year: req.body.year,
      });
      return baseResponse({ message: "success", data: bookCreate })(res, 201);
    } catch (error) {
      next(error);
    }
  }

  static async getAllBook(req, res, next) {
    try {
      let queryParam = req.query;
      // console.log(Object.keys(req.query).length);
      // let data = 'ep'
      if (Object.keys(req.query).length !== 0) {
        const dataList = await book.findAll({
          where: {
            title: { [Op.like]: `%${queryParam.title}%` },
          },
        });
        baseResponse({ message: "success like", data: dataList })(res, 200);
      } else {
        const getAll = await book.findAll();
        baseResponse({ message: "success", data: getAll })(res, 200);
      }
    } catch (error) {
      next(error);
    }
  }

  static async getBookById(req, res, next) {
    try {
      const dataBook = await book.findByPk(req.params.id);
      if (dataBook) {
        return baseResponse({ message: "success", data: dataBook })(res, 200);
      }
      return baseResponse({ success: false, message: "not found" })(res, 200);
    } catch (error) {
      next(error);
    }
  }

  static async updateBook(req, res, next) {
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
        return baseResponse({ message: "success", data: data })(res, 200);
      }
      return baseResponse({ success: false, message: "not found" })(res, 200);
    } catch (error) {
      next(error);
    }
  }

  static async deleteBooks(req, res, next) {
    try {
      const dataDel = await book.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (dataDel) {
        return baseResponse({ message: "success", data: dataDel })(res, 200);
      }
      return baseResponse({ success: false, message: "not found" })(res, 200);
    } catch (error) {
      next(error);
    }
  }

  static async uploadCover(req, res, next) {
    try {
      const file = req.file.path;
      const id = req.params.id;

      const data = await book.findByPk(id);
      // console.log(data.dataValues.title)
      const dataUrl = {
        authorId: data.dataValues.authorId,
        publisherId: data.dataValues.publisherId,
        title: data.dataValues.title,
        price: data.dataValues.price,
        year: data.dataValues.year,
        urlCover: file,
      };
      if (data) {
        const dataupdate = await book.update(dataUrl, {
          where: {
            id: id,
          },
        });
        const data = await book.findByPk(id);
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
      res.status(500);
      next(error);
    }
  }
}

module.exports = BookController;
