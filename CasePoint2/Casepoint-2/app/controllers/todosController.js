const { todo, comment } = require("./../db/models");
const response = require("./../response/res");

class TodoController {
  static async CreateTodo(req, res) {
    try {
      const dataTodo = await todo.create({
        title: req.body.title,
        description: req.body.description,
        userId: req.body.userId,
      });
      return response.resJsonSucces("success create todo", dataTodo, 201, res);
    } catch (error) {
      return response.resJsonNotSuccess(error.message, error, 500, res);
    }
  }

  static async getAllTodo(req, res) {
    try {
      const dataTodo = await todo.findAll();
      return response.resJsonSucces(
        "success find all Todos",
        dataTodo,
        200,
        res
      );
    } catch (error) {
      response.resJsonNotSuccess(error.message, error, 500, res);
    }
  }

  static async getByIdTodoComment(req, res) {
    try {
      const dataTodo = await todo.findByPk(req.params.id, {
        include: comment,
      });
      if (dataTodo) {
        return response.resJsonSucces("Success", dataTodo, 200, res);
      }
      return response.resJsonSucces("Todo doesn't exist", dataTodo, 200, res);
    } catch (error) {
      return response.resJsonNotSuccess(error.message, error, 500, res);
    }
  }

  static async getByIdTodo(req, res) {
    try {
      const dataTodo = await todo.findByPk(req.params.id);
      if (dataTodo) {
        return response.resJsonSucces(
          "success find Todo by id",
          dataTodo,
          200,
          res
        );
      }
      return response.resJsonNotSuccess(
        "todo doesn't exist",
        dataTodo,
        200,
        res
      );
    } catch (error) {
      return response.resJsonNotSuccess(error.message, error, 500, res);
    }
  }

  static async deleteTodo(req, res) {
    try {
      const dataTodo = await todo.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (dataTodo) {
        return response.resJsonSucces(
          "todo deleted successfully",
          dataTodo,
          200,
          res
        );
      }
      return response.resJsonSucces("todo doesn't exist", dataTodo, 200, res)
    } catch (error) {
      return response.resJsonNotSuccess(error.message, error, 500, res);
    }
  }

  static async updateTodo(req, res) {
    try {
      const newTodo = {
        title: req.body.title,
        description: req.body.description,
      };

      const todoUpdate = await todo.update(newTodo, {
        where: {
          id: req.params.id,
        },
      });

      if (todoUpdate[0]) {
        const getTodo = await todo.findByPk(req.params.id);
        return response.resJsonSucces(
          "updated successfully",
          getTodo,
          200,
          res
        );
      }
      return response.resJsonSucces("todo doesn't exist", [], 200, res);
    } catch (error) {
      return response.resJsonNotSuccess(error.message, error, 500, res);
    }
  }
}

module.exports = TodoController;
