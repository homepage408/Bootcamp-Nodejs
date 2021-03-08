const { user, todo } = require("./../db/models");
const response = require("./../response/res");

class UserController {
  static async createUser(req, res) {
    try {
      const dataUser = await user.create({
        username: req.body.username,
        fullname: req.body.fullname,
        email: req.body.email,
        password: req.body.password,
      });
      return response.resJsonSucces("Succes Create user", dataUser, 200, res);
    } catch (error) {
      //  return response.notSuccess(error)
      return response.resJsonNotSuccess(error.message, error, 500, res);
    }
  }

  static async getAllUser(req, res) {
    try {
      const dataUser = await user.findAll();
      return response.resJsonSucces(
        "Success find all users",
        dataUser,
        200,
        res
      );
    } catch (error) {
      return response.resJsonNotSuccess(error.message, error, 500, res);
    }
  }

  static async getByIdUserTodos(req, res) {
    try {
      const dataUser = await user.findByPk(req.params.id, {
        include: todo,
      });
      if (dataUser) {
        return response.resJsonSucces(
          "Success find user by id",
          dataUser,
          200,
          res
        );
      }
      return response.resJsonNotSuccess(
        "User tidak ditemukan",
        dataUser,
        200,
        res
      );
    } catch (error) {
      return response.resJsonNotSuccess(error.message, error, 500, res);
    }
  }

  static async getByIdUser(req, res) {
    try {
      const dataUser = await user.findByPk(req.params.id);
      //   console.log(req.params.id);
      //   console.log(dataUser);
      if (dataUser) {
        return response.resJsonSucces(
          "Success find user by id",
          dataUser,
          200,
          res
        );
      }
      return response.resJsonNotSuccess(
        "User tidak ditemukan",
        dataUser,
        200,
        res
      );
    } catch (error) {
      return response.resJsonNotSuccess(error.message, error, 500, res);
    }
  }

  static async deleteUser(req, res) {
    try {
      const dataUser = await user.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (dataUser) {
        return response.resJsonSucces(
          "Data Berhasil dihapus",
          dataUser,
          200,
          res
        );
      }
      return response.resJsonSucces("user doesn't exist", dataTodo, 200, res);
    } catch (error) {
      return response.resJsonNotSuccess(error.message, error, 500, res);
    }
  }

  static async updateUser(req, res) {
    try {
      const newUser = {
        username: req.body.username,
        fullname: req.body.fullname,
      };

      const userUpdate = await user.update(newUser, {
        where: {
          id: req.params.id,
        },
      });

      if (userUpdate[0]) {
        const getUser = await user.findByPk(req.params.id);
        return response.resJsonSucces(
          "Data berhasil diperbaharui",
          getUser,
          200,
          res
        );
        // console.log(getUser)
      }
      return response.resJsonNotSuccess("Data tidak ditemukan", [], 404, res);
    } catch (error) {
      return response.resJsonNotSuccess(error.message, error, 500, res);
    }
  }
}

module.exports = UserController;
